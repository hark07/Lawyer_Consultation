import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoConsultation = () => {
  const { appointmentId } = useParams();

  const localVideoRef = useRef(null);

  const [joined, setJoined] = useState(false);
  const [meetingId, setMeetingId] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);

  const joinMeeting = async () => {
    try {
      if (!APP_ID) {
        toast.error("Agora App ID not found");
        return;
      }

      // Create meeting if not exists

      await API.post("/meetings/create", {
        appointmentId,
      });

      // Get meeting details

      const meetingRes = await API.get(
        `/meetings/appointment/${appointmentId}`,
      );

      const meeting = meetingRes.data;

      setMeetingId(meeting._id);

      const roomId = meeting.roomId;

      // Start meeting

      await API.put(`/meetings/${meeting._id}/start`);

      // Generate Agora token

      const tokenRes = await API.post("/agora/token", {
        channelName: roomId,
      });

      const { token, channelName } = tokenRes.data;

      // Join Agora channel

      await client.join(APP_ID, channelName, token, null);

      // Create mic and camera tracks

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      setLocalTracks(tracks);

      // Publish tracks

      await client.publish(tracks);

      // Play local video

      tracks[1].play(localVideoRef.current);

      // Remote user joins

      client.on("user-published", async (remoteUser, mediaType) => {
        await client.subscribe(remoteUser, mediaType);

        if (mediaType === "video") {
          const playerId = String(remoteUser.uid);

          let player = document.getElementById(playerId);

          if (!player) {
            player = document.createElement("div");

            player.id = playerId;

            player.className = "w-full h-full";

            document.getElementById("remote-container").appendChild(player);
          }

          remoteUser.videoTrack.play(player);
        }

        if (mediaType === "audio") {
          remoteUser.audioTrack.play();
        }
      });

      // Remote user leaves

      client.on("user-unpublished", (remoteUser) => {
        const player = document.getElementById(String(remoteUser.uid));

        if (player) {
          player.remove();
        }
      });

      setJoined(true);

      toast.success("Meeting Joined");
    } catch (error) {
      console.error("JOIN MEETING ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to join meeting",
      );
    }
  };

  const leaveMeeting = async () => {
    try {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });

      await client.leave();

      if (meetingId) {
        await API.put(`/meetings/${meetingId}/end`);
      }

      setJoined(false);

      toast.success("Meeting Ended");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (joined) {
        leaveMeeting();
      }
    };
  }, [joined]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Video Consultation</h1>

          {!joined ? (
            <button
              onClick={joinMeeting}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
            >
              Join Meeting
            </button>
          ) : (
            <button
              onClick={leaveMeeting}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
            >
              End Meeting
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Local Video */}

            <div>
              <h2 className="font-semibold mb-3">Your Camera</h2>

              <div
                ref={localVideoRef}
                className="bg-black h-[350px] rounded-xl overflow-hidden"
              />
            </div>

            {/* Remote Video */}

            <div>
              <h2 className="font-semibold mb-3">Remote User</h2>

              <div
                id="remote-container"
                className="bg-black h-[350px] rounded-xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoConsultation;
