import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from '../routes';

export default (store, req) => {
    const theHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Hacker News</title>
        <link rel="stylesheet" type="text/css" href="/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
    <header>Hacker News - top | new
    </header>
    <main id="bootstrap">{{{reactele}}}</main>
    <script>
        window.INITIAL_NEWS=${serialize(store.getState()).replace(/</g,'\\u003c')}
    </script>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml);
    const reactele = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>
    );
    const renderedHtml = hbsTemplate({reactele});

    return renderedHtml;
}