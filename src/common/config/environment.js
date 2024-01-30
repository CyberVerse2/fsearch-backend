import * as dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENT = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || 3000,
    ENV: process.env.APP_ENV
  },
  DB: {
    URL: process.env.DB_URL
  },
  CLARIFAI: {
    PAT: process.env.CLARIFAI_PAT,
    USER_ID: process.env.CLARIFAI_USER_ID,
    APP_ID: process.env.CLARIFAI_APP_ID,
    MODEL_ID: process.env.CLARIFAI_MODEL_ID,
    MODEL_VERSION_ID: process.env.CLARIFAI_MODEL_VERSION_ID
  },
  AUTH0: {
    AUDIENCE: process.env.AUTH0_AUDIENCE,
    ISSUER_URL: process.env.AUTH0_ISSUER_URL
  }
};