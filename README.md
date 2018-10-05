## Simple Promise Wrapper library for chaining controller functions
When I last time worked on node api server and cdn server for digital signage solution, I used promise library for asynchronous mongodb calls.
And syntax like "new Promise(...)" is everywhere. The more complex the business logic becomes like in one save-campaign api call, needs to save layouts
which has nested layout, each of which has playlist that need to be saved and inside playlist has medias to be saved. Use of promise goes crazy and has 
warnings that are hard to debug for promise inside promise inside promise functions.

Maybe we have structured api wrong way. Or maybe not. Look at such scenario, at one free time, I decided to simplify the flow of promise usages for http apis,
no matter how the business logic goes. I created two short wrapper files ("./lib/http.js", "./lib/promise.js"). And that's it.

The implementation is a promise wrapper functions that is called by http helper functions that will receive request object, chain the controller functions that handle the business logic, and return back the response object.

There is simple-file-api-server folder (node api server) to test out the promise chain functions, and to understand the usage of the functions.

If you look at './simple-file-api-server/routes/fileRoute.js', you can see the file upload processes are chained, one after another.
I didn't need to use one single word of promise in the controller file(s). All are handled in the wrapper files. I only need to chain the controller functions in the route file and inside controller files, I can implement the functions as I wish. Just need to fulfill() or reject(), just like a function return true or false.

Separation of concerns is achieved. Route files simply link the route to route handler functions that chain the business logic. Controller files simply implement the logic.

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

I know that there are powerful and simple-to-use libraries like async and others. I just created this for fun, to understand more on the promise library.
I am using it in some of the projects, and it's quite convenient. 