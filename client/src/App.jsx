import React from "react";
import { useRoutes } from "./routes";

const App = () => {
  const routes = useRoutes(false);
  return <div className="container">{routes}</div>;
};

export default App;
