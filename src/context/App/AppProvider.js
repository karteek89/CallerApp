import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = props => {
  var pathSections = window.location.pathname.split("/");
  const id = pathSections[pathSections.length - 1];
  const [appId, setAppId] = useState(id);

  return (
    <AppContext.Provider value={[appId, setAppId]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
