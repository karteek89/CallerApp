import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const GuestRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const isAuthenticated = useSelector(state => !!state.auth.token);
  return (
    <Route
      {...rest}
      render={matchProps =>
        isAuthenticated ? (
          <Redirect to="/apps" />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

GuestRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default GuestRouteWithLayout;
