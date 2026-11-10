import { createAuthClient } from '@neon/neon-js/auth';
import { NEON_AUTH_URL } from './api';

/** Neon Auth client. Only used when VITE_NEON_AUTH_URL is set. */
export const neonAuth = createAuthClient(NEON_AUTH_URL || 'http://localhost');