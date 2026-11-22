import type { GlobalConfig } from 'payload'

import { draftsOrAdmin } from '../access/drafts-or-admin'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: { read: () => true, update: draftsOrAdmin },
  fields: [{ name: 'title', type: 'text' }],
  versions: { drafts: true },
}
