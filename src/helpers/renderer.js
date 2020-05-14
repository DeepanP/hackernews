import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../routes';
import hbs from 'handlebars';

export default (req) => {
    const theHtml = `
    <html>
    <head>
        <title>Hacker News Channel</title>
    </head>
    <body>
    <header>
        <div class="container">top | new</div>
    </header>
    <main id="bootstrap">{{{reactele}}}</main>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml);
    const reactele = renderToString(<StaticRouter location={req.path} context={{}}><Routes/></StaticRouter>);
    const renderedHtml = hbsTemplate({reactele});

    return renderedHtml;
}