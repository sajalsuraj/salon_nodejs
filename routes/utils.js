export async function findAllModelsWrappoer(model, options, req) {
    const queryWhere = model.createWhereFromQuery?.(req.query);
    if (queryWhere) {
        options.where = {
            ...queryWhere,
            ...options.where,
        }
    }
    return await model.findAll(options);
}
