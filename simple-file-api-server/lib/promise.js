var Promise = require('promise');

exports.funcToPromise = (func) => {
    return new Promise(func);
}

exports.chain = (funcs) => {
    var ready = this.funcToPromise(funcs[0]);
    funcs.splice(0, 1);
     
    funcs.forEach((func) => {
        ready = ready.then((result) => {
            return this.funcWithParamToPromise(func, result);
        });
    });

    return ready;
}

exports.chainAll = (funcChains) => {
    var chains = [];
    for (var i = 0; i < funcChains.length; i++) {
        chains.push(this.chain(funcChains[i]));
    }

    return Promise.all(chains);
}

exports.funcWithParamToPromise = (func, param) => {
    return new Promise((fulfill, reject) => {
        new Promise(func(param)).then((result) => {
            fulfill(result);
        }, (error) => {
            reject(error);
        });     
    });
}
