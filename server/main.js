const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const logger = require('winston');

const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ROOT_DIR = process.cwd();


//=========================================================
//  SETUP
//---------------------------------------------------------
const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();


// HTTP headers
app.disable('x-powered-by');
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.hsts({force: true, maxAge: 7776000000})); // 7776000000ms == 90 days
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());

// gzip compression
app.use(compression());

// development env
if (ENV_DEVELOPMENT) {
  app.use(require('morgan')('dev'));
}

// static files
app.use(express.static(`${ROOT_DIR}/target`, {index: false}));
app.use(favicon(`${ROOT_DIR}/server/static/favicon.ico`));


//=========================================================
//  ROUTER
//---------------------------------------------------------
const router = new express.Router();

router.all('*', (req, res) => {
  if (ENV_PRODUCTION && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  else {
    res.sendFile(`${ROOT_DIR}/target/index.html`);
  }
});

app.use(router);


//=========================================================
//  START SERVER
//---------------------------------------------------------
app.listen(PORT, HOST, error => {
  if (error) {
    logger.error(error);
  }
  else {
    logger.info(`Server listening @ ${HOST}:${PORT}`);
  }
});
