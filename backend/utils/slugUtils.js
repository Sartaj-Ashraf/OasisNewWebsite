// utils/slugUtils.js

/**
 * Convert any string to a URL-safe slug.
 * e.g. "Senior React Developer!" → "senior-react-developer"
 */
export function makeSlug(str) {
  return str
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')   // strip diacritics
    .replace(/[^a-zA-Z0-9\s-]/g, '')   // strip special chars
    .trim()
    .replace(/\s+/g, '-')              // spaces → dashes
    .replace(/-+/g, '-')               // collapse consecutive dashes
    .toLowerCase();
}

/**
 * Validate that a slug only contains lowercase letters, numbers, and dashes.
 */
export function validateSlug(slug) {
  return typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Low-level: keep trying slug, slug-1, slug-2 … until one is free.
 * @param {mongoose.Model} Model
 * @param {string} baseSlug   - already-slugified base string
 * @param {string|null} excludeId - _id to ignore (for updates)
 */
export async function getUniqueSlug(Model, baseSlug, excludeId = null) {
  let slug = baseSlug;
  let num  = 1;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const exists = await Model.exists(query);
    if (!exists) break;
    slug = `${baseSlug}-${num++}`;
  }

  return slug;
}

/**
 * High-level helper used by the controller.
 * Accepts a raw title string and options, returns a guaranteed-unique slug.
 *
 * @param {mongoose.Model} Model
 * @param {string} title
 * @param {{ excludeId?: string, fallbackPrefix?: string }} [opts]
 */
export async function generateUniqueSlug(Model, title, opts = {}) {
  const { excludeId = null, fallbackPrefix = 'item' } = opts;
  const base = makeSlug(title) || makeSlug(fallbackPrefix);
  return getUniqueSlug(Model, base, excludeId);
}