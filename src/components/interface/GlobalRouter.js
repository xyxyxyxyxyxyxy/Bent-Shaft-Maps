import React from "react";
import Global from "./Global";
import RiverRouter from "./RiverRouter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import RiverList from "../../river-data/RiverList";
import idParser from "../../tools/idParser";
import readRiverFilesRequest from "../../tools/serverless/readRiverFilesRequest";

const GlobalRouter = () => {

  

  const routeArray = RiverList.map((elem, key) => {
    return (
      <Route path={`/${idParser(elem.name)}`} key={`river${key}`}>
        <RiverRouter data={elem.data} global={elem.global} />
      </Route>
    );
  });

  //readRiverFilesRequest("./src/river-data");

  return (
    <Switch>
      <Route exact path="/">
        <Global />
      </Route>

      {routeArray}
    </Switch>
  );
};

export default GlobalRouter;
