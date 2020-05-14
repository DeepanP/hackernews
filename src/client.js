import React from "react";
import { hydrate } from "react-dom";
import Routes from './routes';
import { BrowserRouter } from "react-router-dom";

hydrate(
<BrowserRouter>
<Routes/>
</BrowserRouter>, document.getElementById("bootstrap"));