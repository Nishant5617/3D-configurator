// import React, { useEffect, useMemo, useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { applyWoodTexture } from '../utils/applyWoodTexture';


// function LegModel({ furnitureId, legOption, woodFinish }) {
//   const modelPath = legOption.modelPathTemplate.replace(/{furnitureId}/g, furnitureId);
//   const { scene } = useGLTF(modelPath);
//   const legRef = useRef();

//   useEffect(() => {
//     if (legRef.current && woodFinish) {
//       applyWoodTexture(legRef.current, woodFinish);
//     }
//   }, [woodFinish]);

//   const model = useMemo(() => scene ? scene.clone() : null, [scene]);

//   if (!model) return null;
//   return <primitive object={model} ref={legRef} />;
// }

// export default LegModel;
import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { applyWoodTexture } from '../utils/applyWoodTexture';

const LegModel = ({ modelPath, woodFinish, selectedSize, furnitureOptions }) => {
  const { scene } = useGLTF(modelPath);
  
  // Clone the model when it loads or changes
  const model = useMemo(() => scene ? scene.clone() : null, [scene]);
  
  // Apply same wood finish as the furniture to the legs
  useEffect(() => {
    if (model && woodFinish && selectedSize && furnitureOptions) {
      applyWoodTexture(model, woodFinish, selectedSize, furnitureOptions, true);
    }
  }, [model, woodFinish, selectedSize, furnitureOptions]);

  if (!model) return null;
  return <primitive object={model} />;
};

export default LegModel;