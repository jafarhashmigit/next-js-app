router
  .post(
    "/post/add",
    middlewares.validation.request,
    actions.post.action.addPost
  )
  .get(
    "/post/all",
    middlewares.validation.request,
    actions.post.action.allPost
  )
  .get(
    "/post/view/:slug",
    middlewares.validation.request,
    actions.post.action.getOnePost
  )
  .patch(
    "/post/update/:id",
    middlewares.validation.request,
    actions.post.action.updatePost
  )
  .delete(
    "/post/delete/:id",
    middlewares.validation.request,
    actions.post.action.deletePost
  );
module.exports = { prefix: "note", router };