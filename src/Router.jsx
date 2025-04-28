import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouterLanding from "./RouterLanding";  // ⬅ new component that holds the old landing UI
import ModelViewer2  from "./ModelViewer2";
import ARBridge      from "./ARBridge";       // ⬅ new mobile-only bridge

const RouterComponent = () => (
  <Router>
    <Routes>
      <Route path="/"             element={<RouterLanding />} />
      <Route path="/ar-bridge"    element={<ARBridge />} />
      <Route path="/model-viewer" element={<ModelViewer2 />} />
    </Routes>
  </Router>
);

export default RouterComponent;
