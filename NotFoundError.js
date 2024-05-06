class NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} not found`)
    }
}

module.exports = NotFoundError