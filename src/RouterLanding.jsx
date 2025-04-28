import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import SceneContent   from "./components/SceneContent";
import { useConfigurator } from "./components/ConfiguratorContext";

const RouterLanding = () => {
  const { state, actions } = useConfigurator();
  const {
    selectedSize,  woodFinish,  handleType,
    handleFinish,  legOption,   options,
  } = state;
  const {
    setSelectedSize, setWoodFinish, setHandleType,
    setHandleFinish, setLegOption,
  } = actions;

  return (
    <div className="container">
      <div className="header">
        <h1>3D Product Configurator</h1>
        <p>
          Real-time 3D customization that brings furniture to life—change
          colors, materials, and features with ease.
        </p>
      </div>

      <div className="content-wrapper">
        {/* ——— Viewer ——— */}
        <div className="viewer-container">
          <Canvas camera={{ position: [1.2, 1.2, 1.2], fov: 45 }}
                  style={{ background: "#f5f5f5" }}>
            <Suspense fallback={<Html center>Loading…</Html>}>
              <SceneContent
                selectedSize       ={selectedSize}
                woodFinish         ={woodFinish}
                handleType         ={handleType}
                handleFinish       ={handleFinish}
                legOption          ={legOption}
                furnitureOptions   ={options.furnitureOptions}
                woodFinishOptions  ={options.woodFinishOptions}
                handleOptions      ={options.handleOptions}
                handleFinishOptions={options.handleFinishOptions}
                legOptions         ={options.legOptions}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* ——— Config panel ——— */}
        <div className="config-container">
          <h2>Ancestry</h2>
          <p>
            With Ancestry Collection the best from generation to generation is
            carried forward.
          </p>
          <br />

          {/* Size */}
          <label>Select Size:</label>
          <select
            value={selectedSize?.id || ""}
            onChange={e =>
              setSelectedSize(
                options.furnitureOptions.find(o => o.id === e.target.value)
              )
            }>
            {options.furnitureOptions.map(o =>
              <option key={o.id} value={o.id}>{o.name}</option>
            )}
          </select>

          {/* Wood finish */}
          <label>Select Wood Finish:</label>
          <select
            value={woodFinish?.id || ""}
            onChange={e =>
              setWoodFinish(
                options.woodFinishOptions.find(o => o.id === e.target.value)
              )
            }>
            {options.woodFinishOptions.map(o =>
              <option key={o.id} value={o.id}>{o.name}</option>
            )}
          </select>

          {/* Handle type */}
          <label>Select Handle Type:</label>
          <select
            value={handleType?.id || ""}
            onChange={e =>
              setHandleType(
                options.handleOptions.find(o => o.id === e.target.value)
              )
            }>
            {options.handleOptions.map(o =>
              <option key={o.id} value={o.id}>{o.name}</option>
            )}
          </select>

          {/* Handle finish */}
          <label>Select Handle Finish:</label>
          <select
            value={handleFinish?.id || ""}
            onChange={e =>
              setHandleFinish(
                options.handleFinishOptions.find(o => o.id === e.target.value)
              )
            }>
            {options.handleFinishOptions.map(o =>
              <option key={o.id} value={o.id}>{o.name}</option>
            )}
          </select>

          {/* Leg option */}
          <label>Select Leg Option:</label>
          <select
            value={legOption?.id || ""}
            onChange={e =>
              setLegOption(
                options.legOptions.find(o => o.id === e.target.value)
              )
            }>
            {options.legOptions.map(o =>
              <option key={o.id} value={o.id}>{o.name}</option>
            )}
          </select>
        </div>
      </div>
      {/* QR-modal is rendered automatically by ConfiguratorProvider */}
    </div>
  );
};

export default RouterLanding;
