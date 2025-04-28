import React, { useEffect, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Canvas, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { ConfiguratorProvider, useConfigurator }
  from "./components/ConfiguratorContext";
import SceneContent from "./components/SceneContent";
import { options as initialOptions } from "./App";

/* very simple UA sniff */
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* Hidden exporter component ------------------------------------------------ */
const HiddenExporter = ({ selections, onDone }) => {
  const { scene }   = useThree();
  const { actions } = useConfigurator();

  /* set the correct selections in context so SceneContent renders variants */
  useEffect(() => {
    const opts = initialOptions;
    actions.setSelectedSize (opts.furnitureOptions   .find(o => o.id === selections.size));
    actions.setWoodFinish   (opts.woodFinishOptions  .find(o => o.id === selections.wood));
    actions.setHandleType   (opts.handleOptions      .find(o => o.id === selections.handle));
    actions.setHandleFinish (opts.handleFinishOptions.find(o => o.id === selections.finish));
    actions.setLegOption    (opts.legOptions         .find(o => o.id === selections.leg));
  }, [selections, actions]);

  /* wait a bit for GLTFs, then export & signal done */
  useEffect(() => {
    const id = setTimeout(async () => {
      const blobUrl = await actions.exportSceneAsBlob();
      onDone(blobUrl);
    }, 2500);               // tweak if your GLBs are heavier/lighter
    return () => clearTimeout(id);
  }, [actions, onDone]);

  return (
    <>
      <ambientLight intensity={0.4}/>
      <Suspense fallback={<Html>building…</Html>}>
        <SceneContent />
      </Suspense>
    </>
  );
};

/* ------------------------------------------------------------------------- */
const ARBridge = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  /* if desktop user lands here by mistake → bounce home */
  if (!isMobile) {
    navigate("/", { replace:true });
    return null;
  }

  /* collect variant IDs from querystring */
  const selections = {
    size   : params.get("modelId"),
    wood   : params.get("woodFinish"),
    handle : params.get("handleType"),
    finish : params.get("handleFinish"),
    leg    : params.get("legOption"),
  };

  /* called once blob ready */
  const handleDone = (blobUrl) =>
    navigate("/model-viewer", { replace:true, state:{ glbUrl: blobUrl } });

  return (
    <div style={{ width:"100%", height:"100vh", display:"flex",
                  justifyContent:"center", alignItems:"center" }}>
      <p>Preparing AR model…</p>

      <div style={{ position:"fixed", left:-9999, top:-9999,
                    width:1, height:1, overflow:"hidden" }}>
        <ConfiguratorProvider initialOptions={initialOptions}>
          <Canvas camera={{ position:[2,2,2], fov:45 }}>
            <HiddenExporter selections={selections} onDone={handleDone}/>
          </Canvas>
        </ConfiguratorProvider>
      </div>
    </div>
  );
};

export default ARBridge;
