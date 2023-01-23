const crudService = new services.CrudService(models.Post);

exports.action = {
    addPost: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const createPost = await crudService.add(payload);
            utils.apiResponse.ok(res, messages.success, createPost);
        } catch (err) {
            next(err);
        }
    },
    allPost: async (req, res, next) => {
        try {
            const allPost = await models.Post.find({});
            utils.apiResponse.ok(res, messages.success, allPost);
        } catch (err) {
            next(err);
        }
    },
    getOnePost: async (req, res, next) => {
        try {
            let {params: { slug }} = req;
            const getOnePostData = await models.Post.find({slug:slug});
            utils.apiResponse.ok(res, messages.success, getOnePostData);
        } catch (err) {
            next(err);
        }
    },
    updatePost: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const updatePostData =  await crudService.update(payload, req.params.id, messages.notFound("Post"));
            utils.apiResponse.ok(res, messages.success, updatePostData);
        } catch (err) {
            next(err);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const deletePost = await crudService.deleteById(req.params.id);
            utils.apiResponse.ok(res, messages.success, deletePost);
        } catch (err) {
            next(err);
        }
    }
}