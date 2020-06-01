import "@babel/polyfill";
import express from 'express';
import compression from 'compression';
import renderer from './helpers/renderer';
import serverStore from './helpers/serverStore';
import { matchRoutes } from 'react-router-config';
import Routes  from './routes'

const app = new express();

app.use(compression());

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.redirect('/news/1');
});

app.get("/news/?:page", (req, res) => {
    const store = serverStore({ pages : {current: req.params.page}});

    const paths = matchRoutes(Routes, req.path);
    const serverDataFetch = paths.map(({route})=>{
        return route.loadData ? route.loadData(store, { page : req.params.page}) : null
    });

    Promise.all(serverDataFetch).then(()=>{
        res.status(200).send(renderer(store, req));
    },
    ()=>{
        res.status(404).send('no data available');
    }
    );
});

const port = process.env.PORT || 3003;

app.listen(port, function listener() {
    console.log(`Server running in ${port}`);
});