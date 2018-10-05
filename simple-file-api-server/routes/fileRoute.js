var express = require('express');
var router = express.Router();
var httpHandler = require('../lib/http');
var fileController = require('../controllers/fileController');

var multer = require('multer');
var upload = multer({ dest: './files/' });

var uploadFiles = (req, res) => { 
    console.log("Files: ", req.files);

    httpHandler.response(res, [
        fileController.validateFiles(req.files),        
        (files) => (fulfill, reject) => {
            var data = {
                files: files.map(file => {
                    return {
                        name: file.originalname,
                        type: file.mimetype,
                        path: file.path,
                        size: file.size
                    }
                })
            };
            fulfill(data);
        }
    ]);
}

var uploadFilesManually = (req, res) => { 
    console.log("Files: ", req.files);

    httpHandler.response(res, [
        fileController.validateFiles(req.files),
        (validatedFiles) => fileController.extractThumbnails(validatedFiles),
        (filesWithThumbnails) => fileController.compressFiles(filesWithThumbnails),
        (compressedFiles) => fileController.renameFiles(compressedFiles),
        (renamedFiles) => fileController.uploadFiles(renamedFiles),
        (uploadedFiles) => (fulfill, reject) => {
            var data = {
                uploadedFiles: uploadedFiles.map(file => {
                    return {
                        name: file.originalname,
                        type: file.mimetype,
                        path: file.path,
                        size: file.size
                    }
                })
            };
            fulfill(data);
        }
    ]);
}

var removeFiles = (req, res) => { 
    var filePaths = req.body;
    console.log("Files: ", filePaths);

    var removes = [];
    for (var i = 0; i < filePaths.length; i++) {
        var remove = [
            fileController.removeFile(filePaths[i])             
        ];
        removes.push(remove);
    }

    httpHandler.responseAll(res, removes);
}

router.post('/upload', upload.any(), uploadFiles);
router.post('/uploadManual', uploadFilesManually);
router.post('/remove', removeFiles);

module.exports = router;
