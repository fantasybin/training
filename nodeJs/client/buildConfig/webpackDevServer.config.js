

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
// const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const path = require('path');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = 'true' === process.env.HTTPS ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
module.exports = function (proxy, allowedHost) {
  return {

    disableHostCheck:
      !proxy || 'true' === process.env.DANGEROUSLY_DISABLE_HOST_CHECK,
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',

    contentBase: paths.appSrc,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    // src/node_modules is not ignored to support absolute imports
    // https://github.com/facebookincubator/create-react-app/issues/1065
    watchOptions: {
      ignored: new RegExp(
        `^(?!${path
          .normalize(`${paths.appSrc}/`)
          .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
        'g'
      ),
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: 'https' === protocol,
    host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    public: allowedHost,
    proxy: {
      '/mapi': {
        target: 'http://yccmtmwaptest.10101111.com',
        // target: 'http://10.104.10.38:7001',
        // pathRewrite: { '^/mapi': '' },
        secure: false,
        changeOrigin: true,
      },
    },
    before(app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    },
  };
};
