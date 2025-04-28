import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ModelViewer2 = () => {
  /* Accept either router-state (desktop) OR query-string (QR on mobile) */
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const src =
    location.state?.glbUrl ||            // pushed via navigate(..., {state})
    searchParams.get("glbUrl") || "";    // scanned QR code fallback

  /* Load the <model-viewer> library once */
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  /* Optional sanity-check: skip blob: URLs (fetch doesn’t support them) */
  useEffect(() => {
    if (!src || src.startsWith("blob:")) return;
    fetch(src).catch(console.error);
  }, [src]);

  if (!src)
    return <p style={{ textAlign: "center" }}>No model URL supplied.</p>;

  return (
    <model-viewer
      src={src}
      ar
      camera-controls
      touch-action="pan-y"
      style={{ width: "100%", height: "100vh" }}
    >
      <button
        slot="ar-button"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#fff",
          border: "none",
          borderRadius: 4,
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        👋 View&nbsp;in&nbsp;your&nbsp;space
      </button>
    </model-viewer>
  );
};

export default ModelViewer2;
