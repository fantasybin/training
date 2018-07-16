'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const data = { name: 'egg' };

    //await ctx.render('home/index.tpl', data);
    
    var el = '<div><h1>hello world </h1><h1>hi, egg</h1></div>'
    this.ctx.body = el;//'hi, egg';
  }
}

module.exports = HomeController;
