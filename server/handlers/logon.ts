import { Request, Response } from "express";
import request from "request";

import { generateRandomString } from "../util/textUtil";
import { env } from "../environment";

const scope = "user-read-private user-read-email";

export const logonHandler = (req: Request, res: Response) => {
  const state = generateRandomString(16);
  res.cookie(env.stateKey, state);

  const queryParams = new URLSearchParams();
  queryParams.set("response_type", "code");
  queryParams.set("client_id", env.clientId);
  queryParams.set("scope", scope);
  queryParams.set("redirect_uri", env.redirectUri);
  queryParams.set("state", state);

  // your application requests authorization
  res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
};

export const refreshTokenHandler = (req: Request, res: Response) => {
  // requesting access token from refresh token
  const refreshToken = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(env.clientId + ":" + env.clientSecret).toString('base64'),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send({
        access_token: body.access_token,
      });
    }
  });
};

export const callbackHandler = (req: Request, res: Response) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[env.stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`${req.headers.referer}#?error=state_mismatch`);
  } else {
    res.clearCookie(env.stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: env.redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(env.clientId + ":" + env.clientSecret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const accessToken = body.access_token,
          refreshToken = body.refresh_token;

        const queryParams = new URLSearchParams();
        queryParams.set("access_token", accessToken);
        queryParams.set("refresh_token", refreshToken);

        // we can also pass the token to the browser to make requests from there
        res.redirect(`${req.headers.referer}#${queryParams.toString()}`);
      } else {
        res.redirect(`${req.headers.referer}#?error=invalid_token`);
      }
    });
  }
};
