import React from "react";
import { hydrate } from "react-dom";
import FeedsApp from './components/app';

hydrate(
<FeedsApp/>, document.getElementById("bootstrap"));