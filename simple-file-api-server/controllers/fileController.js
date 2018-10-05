var fse = require('fs-extra');

exports.validateFiles = (files) => {
    return (fulfill, reject) => {
        if (files && files.length > 0) {
            fulfill(files);
        } else {
            reject('FILE_UPLOAD_ERROR');
        }
    }
}

exports.removeFile = (filePath) => {
    return (fulfill, reject) => {
        fse.remove(filePath, function (err) {
            if (err) {
                reject('FILE_REMOVE_ERROR');
            } else {
                fulfill();
            }
        })
    }
}

exports.extractThumbnails = (files) => {
    return (fulfill, reject) => {
        var filesWithThumbnails = files;
        // extract thumbnails here
        fulfill(filesWithThumbnails);
    }
}

exports.compressFiles = (files) => {
    return (fulfill, reject) => {
        var compressedFiles = files;
        // compress files here
        fulfill(compressedFiles);
    }
}

exports.renameFiles = (files) => {
    return (fulfill, reject) => {
        var renamedFiles = files;
        // rename files here
        fulfill(renamedFiles);
    }
}

exports.uploadFiles = (files) => {
    return (fulfill, reject) => {
        var filesWithUploadedFilePaths = files;
        //Upload files manually to local folder here
        fulfill(filesWithUploadedFilePaths);
    }
}
