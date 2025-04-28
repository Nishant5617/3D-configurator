

import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const HandleModel = ({ modelPath, handleFinish }) => {
  const { scene } = useGLTF(modelPath);
  
  // Clone the model when it loads or changes
  const model = useMemo(() => scene ? scene.clone() : null, [scene]);
  
  // Apply handle finish when model or finish changes
  useEffect(() => {
    if (model && handleFinish) {
      applyHandleFinish(model, handleFinish);
    }
  }, [model, handleFinish]);

  if (!model) return null;
  return <primitive object={model} />;
};

// Function to apply handle finish material to the handle model
function applyHandleFinish(model, handleFinish) {
  if (!model || !handleFinish) return;

  const textureLoader = new THREE.TextureLoader();
  
  // Load finish texture if available, otherwise just use color
  if (handleFinish.modelPath) {
    textureLoader.load(
      handleFinish.modelPath,
      (texture) => {
        model.traverse((object) => {
          if (object.isMesh) {
            object.material = new THREE.MeshStandardMaterial({
              map: texture,
              color: new THREE.Color(handleFinish.color),
              roughness: 0.4,
              metalness: 0.8,
            });
          }
        });
      },
      undefined,
      (error) => {
        console.error('Error loading handle finish texture:', error);
        // Fallback to just color if texture fails
        applyHandleColor(model, handleFinish.color);
      }
    );
  } else {
    // Just apply color if no texture path
    applyHandleColor(model, handleFinish.color);
  }
}

// Helper function to apply just color
function applyHandleColor(model, color) {
  model.traverse((object) => {
    if (object.isMesh) {
      object.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.4,
        metalness: 0.8,
      });
    }
  });
}

export default HandleModel;