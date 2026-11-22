# Reproduction: a published global is read-only to a user whose `update` access allows drafts

Payload 3.94.1 blank template (`pnpx create-payload-app@latest -t blank`, SQLite) with these additions:

- `src/access/drafts-or-admin.ts`: anyone signed in may save drafts, only an admin may publish
  ([Controlling who can publish](https://payloadcms.com/docs/versions/drafts#controlling-who-can-publish)).
- `src/globals/Settings.ts`: a global with drafts, `update: draftsOrAdmin`.
- `src/collections/Posts.ts`: a collection with drafts and the same rule, for comparison.
- `src/collections/Users.ts`: a `role` field (`admin` or `editor`).

## Steps

1. `cp .env.example .env`, set `PAYLOAD_SECRET`, then `pnpm install` and `pnpm dev`.
2. Create the first user at `/admin` with role `admin`, then a second user with role `editor`.
3. As the admin, open `/admin/globals/settings`, type a title and click **Publish changes**. Create a post and click
   **Publish changes** too.
4. Sign in as the editor and open `/admin/globals/settings`: the title is read-only and there is no **Save Draft**
   button.
5. As the editor, open the published post: the title is editable and **Save Draft** is there.

The editor *can* save a draft of the global through the API (`POST /api/globals/settings?draft=true` succeeds, and
`POST /api/globals/settings/access` with `_status: 'draft'` returns `update: true`); only the admin's edit view refuses.

## Cause

`getDocumentPermissions` (`@payloadcms/next`, `dist/views/Document/getDocumentPermissions.js`) asks `update` access for
a collection with `{ ...data, _status: 'draft' }` and for a global with `data` as stored, which is
`_status: 'published'` once the global is published. Passing `{ ...data, _status: 'draft' }` in the global branch too
gives the editor an editable form with **Save Draft** (and still no **Publish changes**).
