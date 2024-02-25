function errorHandler(err, req, res, next) {
    if(err && err.name === 'UnauthorizedError'){
        return res.status(401).json({message: 'User is unauthorized!'});
    }
    if(err && err.name === 'ValidationError'){
        return res.status(401).json({message: 'Error'});
    }


    return res.status(401).json(err);
}

module.exports = errorHandler
