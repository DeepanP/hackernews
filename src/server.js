import "@babel/polyfill";
import express from 'express';
import compression from 'compression';
import renderer from './helpers/renderer';
import serverStore from './helpers/serverStore';
import {getNews} from './actions';


const app = new express();

app.use(compression());

app.use(express.static('public'));

app.get("*", (req, res, next) => {
    const store = serverStore();
    store.dispatch(getNews()).then(()=>{
        res.status(201).send(renderer(store));
    });
});

const port = process.env.PORT || 3003;

app.listen(port, function listener() {
    console.log(`Server running in ${port}`);
});