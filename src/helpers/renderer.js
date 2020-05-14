import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';
import FeedsApp from '../components/app';

export default (req) => {
    const theHtml = `
    <html>
    <head>
        <title>Hacker News</title>
        <link rel="stylesheet" type="text/css" href="main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
    <header>Hacker News Feeds - top | new
    </header>
    <main id="bootstrap">{{{reactele}}}</main>
    <script src="/app.js" charset="utf-8"></script>
    <script src="/vendor.js" charset="utf-8"></script>
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml);
    const reactele = renderToString(<FeedsApp/>);
    const renderedHtml = hbsTemplate({reactele});

    return renderedHtml;
}