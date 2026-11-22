import type { CollectionConfig } from 'payload'

import { draftsOrAdmin } from '../access/drafts-or-admin'

/** The same access rule on a collection, for comparison: here the editor gets "Save Draft". */
export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { create: draftsOrAdmin, read: () => true, update: draftsOrAdmin },
  admin: { useAsTitle: 'title' },
  fields: [{ name: 'title', type: 'text' }],
  versions: { drafts: true },
}
