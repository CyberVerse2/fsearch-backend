import { auth } from 'express-oauth2-jwt-bearer';
import { ENVIRONMENT } from '../config/environment';

export const protect = auth({
  audience: ENVIRONMENT.AUTH0.AUDIENCE,
  issuerBaseURL: ENVIRONMENT.AUTH0.ISSUER_URL,
});
