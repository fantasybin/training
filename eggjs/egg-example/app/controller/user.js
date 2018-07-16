module.exports = app => {
  return class UserController extends app.Controller {
    * index() {
      const users = yield this.ctx.model.User.findAll();
      this.ctx.body = users;
    }

    * show() {
      const user = yield this.ctx.model.User.findByLogin(this.ctx.params.login);
      yield user.logSignin();
      this.ctx.body = user;
    }
  }
}