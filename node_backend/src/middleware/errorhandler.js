/**
 * Error handler
*/
const errorHandler = (err, req, res, next) => {
    //console.error(err.stack)
    return res.status(500).json(err.stack)
}

module.exports = errorHandler