import React, { createContext, useContext, useState } from "react";
import QRCodeModal from "./QrCodeModal";
import SceneContent from "./SceneContent";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const ConfiguratorContext = createContext();
export const useConfigurator = () => useContext(ConfiguratorContext);

export const ConfiguratorProvider = ({ children, initialOptions }) => {
  /* ── current selections ──────────────────────────────── */
  const [selectedSize,  setSelectedSize ] = useState(initialOptions.furnitureOptions[0]);
  const [woodFinish,    setWoodFinish   ] = useState(initialOptions.woodFinishOptions[0]);
  const [handleType,    setHandleType   ] = useState(initialOptions.handleOptions[0]);
  const [handleFinish,  setHandleFinish ] = useState(initialOptions.handleFinishOptions[0]);
  const [legOption,     setLegOption    ] = useState(initialOptions.legOptions[0]);

  /* ── QR modal ─────────────────────────────────────────── */
  const [showQR, setShowQR] = useState(false);
  const [arUrl,  setArUrl ] = useState("");

  /* ── helper: export current R3F scene to a blob URL ──── */
  const exportSceneAsBlob = async () => {
    const exporter = new GLTFExporter();
    const scene    = SceneContent.getScene();   // set by SceneContent

    let output;
    try { output = await exporter.parseAsync(scene, { binary:true }); }
    catch (e) { console.error(e); return null; }

    const blob = output instanceof ArrayBuffer
      ? new Blob([output], { type:"model/gltf-binary" })
      : new Blob([JSON.stringify(output, null, 2)],
                 { type:"model/gltf+json" });

    const url = URL.createObjectURL(blob);
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return url;
  };

  /* ── context value ───────────────────────────────────── */
  const ctx = {
    state: {
      selectedSize, woodFinish, handleType, handleFinish,
      legOption, showQR, arUrl, options: initialOptions,
    },
    actions: {
      setSelectedSize, setWoodFinish, setHandleType,
      setHandleFinish, setLegOption,
      setShowQR, setArUrl,
      exportSceneAsBlob,
    },
  };

  return (
    <ConfiguratorContext.Provider value={ctx}>
      {children}
      <QRCodeModal isOpen={showQR}
                   onClose={() => setShowQR(false)}
                   arUrl={arUrl}/>
    </ConfiguratorContext.Provider>
  );
};
