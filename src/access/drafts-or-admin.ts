import type { Access } from 'payload'

const publishes = (data: unknown): boolean =>
  typeof data === 'object' && data !== null && '_status' in data && data._status === 'published'

/**
 * Anyone signed in may save drafts; only an admin may publish
 * (https://payloadcms.com/docs/versions/drafts#controlling-who-can-publish).
 */
export const draftsOrAdmin: Access = ({ data, req: { user } }) =>
  Boolean(user) && (user?.role === 'admin' || !publishes(data))
