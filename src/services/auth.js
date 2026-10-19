import crypto from "node:crypto";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js";
import { Session } from "../models/session.js";

export const createSession = async (userId) => {
  return Session.create({
    userId,
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
  });
};

export const setSessionCookies = (res, newSession) => {

  res.cookie("accessToken", newSession.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: FIFTEEN_MINUTES
  });

  res.cookie("refreshToken", newSession.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ONE_DAY
  });

  res.cookie("sessionId", newSession._id, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: ONE_DAY
  });
};
