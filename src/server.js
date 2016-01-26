import path from 'path';
import robots from 'robots.txt';
import express from 'express';
import favicon from 'serve-favicon';
import nunjucks from 'nunjucks';
import stormpath from 'express-stormpath';
import index from './routes';
import { port } from './config';

/**
 * Configure
 */
const app = global.app = express();

/**
 * Enable Nunjucks
 */
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

/**
 * Enable Stormpath
 */
app.use(stormpath.init(app, {
  website: true
}));

/**
 * Static files
 */
app.use(express.static('./dist'));
app.use(favicon(path.resolve(__dirname, 'public', 'favicon.ico')));
app.use(robots(path.resolve(__dirname, 'public', 'robots.txt')));

/**
 * Views
 */
app.use('/', index)
app.use('/panama', stormpath.groupsRequired(['cnl', 'pacgeo'], false), index)

/**
 * Starting Server
 */
app.on('stormpath.ready', function () {
  app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });
});
