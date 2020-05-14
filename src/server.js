import express from 'express';
import compression from 'compression';
import renderer from './helpers/renderer';

const app = new express();

app.use(compression());

app.use(express.static('public'));

app.get("*", (req, res, next) => {
    res.status(201).send(renderer(req));
});

const port = process.env.PORT || 3003;

app.listen(port, function listener() {
    console.log(`Server running in ${port}`);
});