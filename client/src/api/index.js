/**
 * Public API surface for components. Import from '@/api' only:
 *   import { specsApi } from '@/api';
 * Every function works in both modes (VITE_DEMO_MODE true/false) and returns the
 * exact shapes defined in server/app/schemas.
 */
export { ApiError } from './http';
export { specsApi } from './specs';
export { projectsApi } from './projects';
export { secretsApi } from './secrets';
export { qaApi } from './qa';
export { runsApi } from './runs';
export { containersApi } from './containers';
export { hubApi } from './hub';
