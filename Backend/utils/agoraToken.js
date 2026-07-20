import pkg from "agora-access-token";

const { RtcTokenBuilder, RtcRole } = pkg;

export const buildAgoraToken = (channelName, uid = 0) => {
  const appId = process.env.AGORA_APP_ID;

  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs,
  );

  return token;
};
