const chokidar = require('chokidar');
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const Mock = require('mockjs');

const mockDir = path.join(process.cwd(), 'src/mock');

function registerRoutes(app) {
  let mockLastIndex;
  const { mocks } = require('./index.js');
  const mocksForServer = mocks.map((route) => {
    return responseFake(route);
  });
  // console.log('mocksForServer', mocksForServer)
  for (const mock of mocksForServer) {
    app[mock.type](
      mock.url,
      [express.json(), express.urlencoded({ extended: true })],
      mock.response,
    );
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

// for mock server
const responseFake = ({ url, type, response, timeout = 100 }) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_MOCK_API}${url}`.replace(/\/{2,}/g, '/')),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path);
      setTimeout(
        () => res.json(Mock.mock(response instanceof Function ? response(req, res) : response)),
        timeout,
      );
    },
  };
};
// setupMiddlewares: (middlewares, devServer)
module.exports = (middlewares, devServer) => {
  if (!devServer) {
    throw new Error('webpack-dev-server is not defined');
  }
  const app = devServer.app;
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  // app.use(express.json()) // for parsing application/json
  // app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  const mockRoutes = registerRoutes(app);
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`));
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });

  return middlewares;
};
