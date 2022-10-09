import { config } from "dotenv";

config();

export const env = {
  port: process.env.PORT ?? '5000',
  clientId: process.env.CLIENT_ID ?? '',
  clientSecret: process.env.CLIENT_SECRET ?? '',
  redirectUri: process.env.REDIRECT_URI ?? '',
  stateKey: process.env.STATE_KEY ?? '',
};
