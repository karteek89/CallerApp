import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { AuthRouteWithLayout, GuestRouteWithLayout } from "components";
import { Minimal as MinimalLayout } from "layouts";

import { Stats as StatsView, NotFound as NotFoundView } from "views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/stats" />
      <GuestRouteWithLayout
        component={StatsView}
        exact
        layout={MinimalLayout}
        path="/stats"
      />
      <AuthRouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
