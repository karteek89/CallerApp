import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const AuthRouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const isLoggedOut = useSelector(state => !state.auth.token);

  return (
    <Route
      {...rest}
      render={matchProps =>
        isLoggedOut ? (
          <Redirect to="/sign-in" />
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        )
      }
    />
  );
};

AuthRouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default AuthRouteWithLayout;
