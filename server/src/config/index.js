import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logDir = process.env.LOG_DIR;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
export const dbUrl = process.env.MONGO_URI;

export const jwt = {
  secret: process.env.JWT_SECRET,
  tokenExpirationMinutes: process.env.JWT_TOKEN_EXPIRATION_MINUTES,
  refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
};

export const facebook = {
  clientId: process.env.FACEBOOK_APP_ID,
  secret: process.env.FACEBOOK_SECRET,
  callbackUrl: process.env.FACEBOOK_CALLBACK_URL,
};

export const google = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
};
