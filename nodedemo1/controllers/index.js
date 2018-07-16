var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}
var fn_login = async (ctx, next) => {
    console.log('fn_index');
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};
var index = 0;


var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    const createEnv = require('../env.js');
    const env = createEnv('views', {
        watch: true,
        filters: {
            hex: function (n) {
                return '0x' + n.toString(16);
            }
        }
    });

    var s = env.render('hello.html', { name: '小花' });
    console.log(s);
    //ctx.response.body = `<h1>Hello, ${name}!</h1>`;
    ctx.response.body = s;
}

var fn_room = async (ctx, next) => {
    let user = ctx.state.user;
    if (user) {
        ctx.render('room.html', {
            user: user
        });
    } else {
        ctx.response.redirect('/signin');
    }
}

var get_signin = async (ctx, next) => {

    let names = '甲乙丙丁戊己庚辛壬癸';
    let name = names[index % 10];
    ctx.render('signin.html', {
        name: `路人${name}`
    });
}
var post_signin = async (ctx, next) => {
    index ++;
    let name = ctx.request.body.name || '路人甲';
    let user = {
        id: index,
        name: name,
        image: index % 10
    };
    let value = Buffer.from(JSON.stringify(user)).toString('base64');
    console.log(`Set cookie value: ${value}`);
    ctx.cookies.set('name', value);
    ctx.response.redirect('/room');
};
var fn_signout = async (ctx, next) => {
    ctx.cookies.set('name', '');
    ctx.response.redirect('/signin');
}

module.exports = {
    'GET /': fn_index,
    'GET /room': fn_room,
    'GET /login': fn_login,
    'GET /hello/:name': fn_hello,
    'POST /signin': post_signin,
    'GET /signin': get_signin,
    'GET /signout': fn_signout
};