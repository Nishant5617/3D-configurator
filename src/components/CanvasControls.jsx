import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const CanvasControls = ({ onScreenshot, onARView, onToggleMeasurements }) => {
  const { gl, scene, camera } = useThree();

  /* ——— Screenshot ——— */
  const handleScreenshot = () => {
    gl.render(scene, camera);
    const canvas = gl.domElement;

    const link = document.createElement("a");
    link.download = "furniture-configuration.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onScreenshot?.();
  };

  /* ——— JSX ——— */
  return (
    <Html
      position={[0, -1, 0]}
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        display: "flex",
        gap: "15px",
      }}
    >
      {/* Screenshot */}
      <button
        onClick={handleScreenshot}
        title="Take Screenshot"
        style={btnStyle}
      >
        📸
      </button>

      {/* AR / QR */}
      <button
        onClick={onARView}
        title="View In Your Room"
        style={btnStyle}
      >
        📱
      </button>

      {/* Ruler */}
      <button
        onClick={onToggleMeasurements}
        title="Show Measurements"
        style={btnStyle}
      >
        📏
      </button>
    </Html>
  );
};

const btnStyle = {
  background: "#ffffff",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  fontSize: "18px",
};

export default CanvasControls;
