import React, { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from '@react-three/fiber';


const CameraControls = ({ camera, domElement }) => {
  useEffect(() => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // panning vertically will also zoom in/out
    controls.maxPolarAngle = Math.PI / 2; // limit vertical rotation

    return () => {
      controls.dispose(); // Clean up the controls on unmount
    };
  }, [camera, domElement]);

  // Update the controls on each frame
  useFrame(() => {
    if (camera) {
      camera.updateProjectionMatrix(); // Ensures the camera's projection matrix is updated
    }
  });

  return null; // This component does not render anything
};

export default CameraControls;
