import { createAuthClient } from '@neon/neon-js/auth';


/** Neon Auth client. Only used when VITE_NEON_AUTH_URL is set. */
export const neonAuth = createAuthClient('http://localhost');