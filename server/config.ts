import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const BREVO_PASS = process.env.BREVO_PASS;
const BREVO_EMAIL = process.env.BREVO_EMAIL;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const environment = process.env.ENVIROMENT
const appLink = process.env.APP_LINK;


export const config = {
  port: PORT,
  mailConfig: {
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: BREVO_EMAIL,
      pass: BREVO_PASS,
    },
  },
  accessTokenSecret: accessTokenSecret,
  environment: environment,
  support: BREVO_EMAIL,
  from: "",
  appLink: appLink
};
