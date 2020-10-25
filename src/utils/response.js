const response = (res, status, statusMessage, data) => res.status(status).json({
    status: statusMessage,
    data,
});


module.exports = response
