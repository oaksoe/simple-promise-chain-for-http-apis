var promise = require('./promise');

exports.response = (res, funcs) => {  
    promise.chain(funcs).then((data) => {
        console.log('Result: ', data);
        this.responseResult(res, data);
    }, (error) => {
        console.log('Error: ', error);
        this.responseError(res, error);
    });
}

exports.responseAll = (res, funcChains) => {
    promise.chainAll(funcChains).then((data) => {
        this.responseResult(res, data);
    }, (error) => {
        this.responseError(res, error);
    });
}

exports.responseResult = (res, data) => {
    res.status(200).json({
        status: "SUCCESS",
        data: data
    });
}

exports.responseError = (res, error) => {
    res.status(500).json({
        status: "ERROR",
        error: error
    });    
}
