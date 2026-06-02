/* =========================
   TESTIMONIAL VALIDATION
========================= */

export const validateCreateTestimonial = (req, res, next) => {
    const { name, rating, testimonial } = req.body;
    const errors = [];

    /* =========================
       NAME
    ========================= */
    if (!name || !name.trim()) {
        errors.push("Name is required");
    } else if (name.trim().length > 100) {
        errors.push("Name cannot exceed 100 characters");
    }

    /* =========================
       RATING
    ========================= */
    if (rating === undefined || rating === null || rating === "") {
        errors.push("Rating is required");
    } else {
        const parsed = Number(rating);
        if (isNaN(parsed) || parsed < 1 || parsed > 5) {
            errors.push("Rating must be a number between 1 and 5");
        }
    }

    /* =========================
       TESTIMONIAL TEXT
    ========================= */
    if (!testimonial || !testimonial.trim()) {
        errors.push("Testimonial text is required");
    } else if (testimonial.trim().length > 300) {
        errors.push("Testimonial cannot exceed 300 characters");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: errors[0],
            errors,
        });
    }

    next();
};

export const validateUpdateTestimonial = (req, res, next) => {
    const errors = [];

    /* =========================
       NAME (OPTIONAL ON UPDATE)
    ========================= */
    if (req.body.name !== undefined) {
        if (!req.body.name.trim()) {
            errors.push("Name cannot be empty");
        } else if (req.body.name.trim().length > 100) {
            errors.push("Name cannot exceed 100 characters");
        }
    }

    /* =========================
       RATING (OPTIONAL ON UPDATE)
    ========================= */
    if (req.body.rating !== undefined) {
        const parsed = Number(req.body.rating);
        if (isNaN(parsed) || parsed < 1 || parsed > 5) {
            errors.push("Rating must be a number between 1 and 5");
        }
    }

    /* =========================
       TESTIMONIAL (OPTIONAL ON UPDATE)
    ========================= */
    if (req.body.testimonial !== undefined) {
        if (!req.body.testimonial.trim()) {
            errors.push("Testimonial text cannot be empty");
        } else if (req.body.testimonial.trim().length > 300) {
            errors.push("Testimonial cannot exceed 300 characters");
        }
    }


    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: errors[0],
            errors,
        });
    }

    next();
};