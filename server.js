const express = require('express');
const next = require('next');
const Router = require('./routes').Router;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('app prepare============');

  const server = express();

  Router.forEachPattern((page, pattern, defaultParams) => {
    console.log(pattern, page);

    return server.get(pattern, (req, res) => {
      console.log(pattern);

      return app.render(
        req,
        res,
        `/${page}`,
        Object.assign({}, defaultParams, req.query, req.params)
      );
    });
  });

  server.get('*', (req, res) => handle(req, res));
  server.listen(port);
});
