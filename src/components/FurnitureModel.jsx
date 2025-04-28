import React, { useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { applyWoodTexture } from "../utils/applyWoodTexture";

const FurnitureModel = forwardRef(({
  modelPath,
  woodFinish,
  selectedSize,
  furnitureOptions,
  flipVertical = false,
}, ref) => {
  const { scene } = useGLTF(modelPath);

  // Apply wood texture when model or finish changes
  useEffect(() => {
    if (woodFinish && selectedSize && furnitureOptions) {
      // Pass the flipVertical parameter to applyWoodTexture
      applyWoodTexture(
        scene,
        woodFinish,
        selectedSize,
        furnitureOptions,
        flipVertical
      );
    }
  }, [scene, woodFinish, selectedSize, furnitureOptions, flipVertical]);

  if (!scene) return null;
  return <primitive object={scene} ref={ref} />;
});

export default FurnitureModel;