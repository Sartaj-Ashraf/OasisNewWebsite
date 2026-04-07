import slugify from "slugify";

/**
 * Generate unique slug for a mongoose model
 * @param {Model} Model - Mongoose model
 * @param {String} value - Value to generate slug from
 * @param {Object} options
 * @param {String|null} options.excludeId - Exclude current document (for updates)
 * @param {String} options.fallbackPrefix - Used if value is empty
 */
export const generateUniqueSlug = async (
    Model,
    value,
    { excludeId = null, fallbackPrefix = "item" } = {}
) => {
    if (!Model) {
        throw new Error("Model is required for slug generation");
    }

    // Base slug
    let baseSlug = slugify(value || fallbackPrefix, {
        lower: true,
        strict: true,
        trim: true
    });

    if (!baseSlug) {
        baseSlug = fallbackPrefix;
    }

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const query = { slug };

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const existing = await Model.findOne(query).lean();

        if (!existing) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
};