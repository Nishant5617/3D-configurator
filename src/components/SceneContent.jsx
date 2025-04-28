import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { useConfigurator } from "./ConfiguratorContext";

import FurnitureModel from "./FurnitureModel";
import HandleModel    from "./HandleModel";
import LegModel       from "./LegModel";
import CanvasControls from "./CanvasControls";

const SceneContent = ({
  selectedSize, woodFinish, handleType, handleFinish, legOption,
  furnitureOptions, woodFinishOptions, handleOptions, handleFinishOptions, legOptions,
}) => {
  const modelRef = useRef();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const { scene } = useThree();
  const { state, actions } = useConfigurator();
  const navigate = useNavigate();

  /* expose live three.js scene to ConfiguratorContext */
  useEffect(() => { SceneContent.getScene = () => scene; }, [scene]);

  /* resolve chosen variants (with fallbacks) */
  const currentFurniture    = selectedSize   || furnitureOptions[0];
  const currentWoodFinish   = woodFinish     || woodFinishOptions[0];
  const currentHandleType   = handleType     || handleOptions[0];
  const currentHandleFinish = handleFinish   || handleFinishOptions[0];
  const currentLegOption    = legOption      || legOptions[0];

  /* model paths */
  const furnitureModelPath = currentFurniture.modelPath;
  const handleModelPath    = currentHandleType.modelPathTemplate
                               ?.replace(/{furnitureId}/g, currentFurniture.id);
  const legModelPath       = currentLegOption.modelPathTemplate
                               ?.replace(/{furnitureId}/g, currentFurniture.id);

  /* ——— Buttons ——— */
  const handleScreenshot = () => console.log("screenshot captured");

  const handleARView = async () => {
    /* desktop: export + navigate immediately */
    const blobUrl = await actions.exportSceneAsBlob();
    if (!blobUrl) return;
    navigate("/model-viewer", { state:{ glbUrl: blobUrl } });

    /* build QR (mobile) link that *recreates* the scene, not the blob */
    const base = window.location.origin;
    const qrUrl =
      `${base}/ar-bridge?` +
      `modelId=${encodeURIComponent(currentFurniture.id)}` +
      `&woodFinish=${encodeURIComponent(currentWoodFinish.id)}` +
      `&handleType=${encodeURIComponent(currentHandleType.id)}` +
      `&handleFinish=${encodeURIComponent(currentHandleFinish.id)}` +
      `&legOption=${encodeURIComponent(currentLegOption.id)}`;

    actions.setArUrl(qrUrl);
    actions.setShowQR(true);
  };

  const toggleMeasure = () => setShowMeasurements(s => !s);

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <Environment preset="apartment" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10,10,5]} intensity={1} />
      <hemisphereLight intensity={0.3} />

      {furnitureModelPath && (
        <FurnitureModel
          ref={modelRef}
          modelPath={furnitureModelPath}
          woodFinish={currentWoodFinish}
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical
        />
      )}

      {handleModelPath && (
        <HandleModel
          modelPath={handleModelPath}
          handleFinish={currentHandleFinish}
        />
      )}

      {legModelPath && (
        <LegModel
          modelPath={legModelPath}
          woodFinish={currentWoodFinish}
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical
        />
      )}

      <CanvasControls
        onScreenshot={handleScreenshot}
        onARView={handleARView}
        onToggleMeasurements={toggleMeasure}
      />

      {showMeasurements && <>{/* dimension helpers here */}</>}
    </>
  );
};

export default SceneContent;
