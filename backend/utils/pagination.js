export const paginate = async ({
    model,
    query = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    select = "",
}) => {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query).select(select).sort(sort).skip(skip).limit(limit),
        model.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data,
        pagination: {
            total,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        },
    };
};
