import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import toast from "react-hot-toast";

const LawyerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lawyer, setLawyer] = useState(null);

  const [loading, setLoading] = useState(true);

  const [appointmentDate, setAppointmentDate] = useState("");

  const [notes, setNotes] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  // IMAGE URL FIX

  const getImageUrl = (image) => {
    if (!image) {
      return "/default-lawyer.png";
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `https://lawyer-consultation-o63e.onrender.com${image}`;
    }

    return `https://lawyer-consultation-o63e.onrender.com/${image}`;
  };

  // GET LAWYER DETAILS

  const fetchLawyer = async () => {
    try {
      const { data } = await API.get(`/lawyers/${id}`);

      console.log("LAWYER:", data);

      setLawyer(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load lawyer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyer();
  }, [id]);

  // BOOK APPOINTMENT

  const bookAppointment = async () => {
    if (!appointmentDate) {
      return toast.error("Please select appointment date");
    }

    try {
      setBookingLoading(true);

      const selectedDate = new Date(appointmentDate);

      const date = selectedDate.toISOString();

      const time = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      await API.post("/appointments", {
        lawyer: lawyer._id,

        date,

        time,

        consultationType: "video",

        consultationFee: lawyer.consultationFee,

        message: notes,
      });

      toast.success("Appointment Booked Successfully");

      navigate("/appointments");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Booking Failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="h-[70vh] flex justify-center items-center">
          <h2 className="text-2xl font-semibold">Loading...</h2>
        </div>
      </>
    );
  }

  if (!lawyer) {
    return (
      <>
        <Navbar />

        <div className="h-[70vh] flex justify-center items-center">
          <h2 className="text-2xl font-semibold">Lawyer Not Found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
              {/* LEFT IMAGE */}

              <div className="md:col-span-1">
                <img
                  src={getImageUrl(lawyer.profileImage)}
                  alt={lawyer.user?.name || "Lawyer"}
                  className="
                w-full
                h-[420px]
                object-cover
                rounded-2xl
                shadow
                "
                />
              </div>

              {/* RIGHT DETAILS */}

              <div className="md:col-span-2">
                <h1
                  className="
              text-4xl
              font-bold
              text-gray-800
              "
                >
                  {lawyer.user?.name}
                </h1>

                <p
                  className="
              text-blue-600
              text-xl
              font-semibold
              mt-2
              "
                >
                  {Array.isArray(lawyer.specialization)
                    ? lawyer.specialization.join(", ")
                    : lawyer.specialization}
                </p>

                <p
                  className="
              text-gray-600
              mt-5
              leading-relaxed
              "
                >
                  {lawyer.bio}
                </p>

                {/* INFO CARDS */}

                <div
                  className="
              grid
              sm:grid-cols-3
              gap-4
              mt-8
              "
                >
                  <div
                    className="
                bg-gray-100
                rounded-xl
                p-4
                "
                  >
                    <p className="text-gray-500">Experience</p>

                    <h3
                      className="
                  text-xl
                  font-bold
                  "
                    >
                      {lawyer.experience} Years
                    </h3>
                  </div>

                  <div
                    className="
                bg-gray-100
                rounded-xl
                p-4
                "
                  >
                    <p className="text-gray-500">Consultation Fee</p>

                    <h3
                      className="
                  text-xl
                  font-bold
                  text-green-600
                  "
                    >
                      Rs. {lawyer.consultationFee}
                    </h3>
                  </div>

                  <div
                    className="
                bg-gray-100
                rounded-xl
                p-4
                "
                  >
                    <p className="text-gray-500">Rating</p>

                    <h3
                      className="
                  text-xl
                  font-bold
                  "
                    >
                      ⭐ {lawyer.rating || 5}
                    </h3>
                  </div>
                </div>

                {/* OTHER DETAILS */}

                <div
                  className="
              mt-8
              grid
              md:grid-cols-3
              gap-4
              "
                >
                  <div
                    className="
                border
                rounded-lg
                p-4
                "
                  >
                    <b>Location</b>

                    <p>{lawyer.location}</p>
                  </div>

                  <div
                    className="
                border
                rounded-lg
                p-4
                "
                  >
                    <b>Qualification</b>

                    <p>{lawyer.qualification}</p>
                  </div>

                  <div
                    className="
                border
                rounded-lg
                p-4
                "
                  >
                    <b>Bar Registration</b>

                    <p>{lawyer.barRegistration}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOOKING SECTION */}

            <div
              className="
          mt-12
          border-t
          pt-8
          "
            >
              <h2
                className="
            text-3xl
            font-bold
            mb-6
            "
              >
                Book Appointment
              </h2>

              <div className="space-y-4">
                <input
                  type="datetime-local"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="
                w-full
                border
                rounded-lg
                p-3
                "
                />

                <textarea
                  rows="5"
                  placeholder="
                Describe your legal issue...
                "
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="
                w-full
                border
                rounded-lg
                p-3
                "
                />

                <button
                  onClick={bookAppointment}
                  disabled={bookingLoading}
                  className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-8
                py-3
                rounded-lg
                font-semibold
                "
                >
                  {bookingLoading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerDetails;
