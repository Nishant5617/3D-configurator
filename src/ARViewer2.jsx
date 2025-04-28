// import React from 'react';

// const ARViewer = () => {
//   return (
//     <div style={{ padding: 40, textAlign: 'center' }}>
//       <h1>AR Viewer Page</h1>
//       <p>This is where the AR rendering will happen.</p>
//       {/* You can embed model, iframe, or camera view here */}
//     </div>
//   );
// };

// export default ARViewer;

import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ARViewer() {
  const location = useLocation();
  const modelUrl = new URLSearchParams(location.search).get('model');
  const containerRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!modelUrl) {
      setError('No model URL provided');
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    const loader = new GLTFLoader();
    const absoluteModelUrl = new URL(modelUrl, window.location.origin).href;

    loader.load(
      absoluteModelUrl,
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 2;
        
        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        const loadingPercentage = Math.round((xhr.loaded / xhr.total) * 100);
        console.log(`${loadingPercentage}% loaded`);
      },
      (error) => {
        console.error('Error loading model:', error);
        setError(`Failed to load 3D model: ${error.message}`);
        setLoading(false);
      }
    );

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div className="ar-viewer-container" style={{ width: '100%', height: '100vh' }}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading 3D Model...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <p>Please try again or contact support if the issue persists.</p>
        </div>
      )}
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: loading || error ? 'none' : 'block' 
        }}
      />
    </div>
  );
}

export default ARViewer;
// 

// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const ARViewer = () => {
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [error, setError] = useState(null);
//   const viewerRef = useRef(null);

//   // Get parameters from URL
//   const modelId = searchParams.get("modelId") || "565-01";
//   const woodFinish = searchParams.get("woodFinish") || "Cafelle";
//   const handleType = searchParams.get("handleType") || "handle-1";
//   const handleFinish = searchParams.get("handleFinish") || "Antique English";
//   const legOption = searchParams.get("legOption") || "Leg A";

//   // Construct paths for all components
//   const mainModelPath = `/565/${modelId}/${modelId}.glb`;
//   const handleModelPath = `/565/${modelId}/Handle/${modelId} ${handleType}.glb`;
//   const legModelPath = `/565/${modelId}/Leg Options/${legOption}.glb`;

//   // Find the corresponding wood finish texture and handle finish
//   const getWoodFinishDetails = () => {
//     // This should match your woodFinishOptions array in App.jsx
//     const finishes = [
//       { name: 'Cafelle', color: '#362617', texturePathTemplate: `565/${modelId}/Varients/WOOD LAMINATE FINISHES/Cafelle.png` },
//       { name: 'Amber', color: '#8B5A2B', texturePathTemplate: `565/${modelId}/Varients/WOOD LAMINATE FINISHES/Amber.png` },
//       // Add other finishes here
//     ];
    
//     return finishes.find(f => f.name === woodFinish) || finishes[0];
//   };

//   const getHandleFinishDetails = () => {
//     // This should match your handleFinishOptions array in App.jsx
//     const finishes = [
//       { name: 'Antique English', color: '#704214' },
//       { name: 'Brushed Nickel', color: '#C0C0C0' },
//       { name: 'Satin Nickel', color: '#352A20' },
//     ];
    
//     return finishes.find(f => f.name === handleFinish) || finishes[0];
//   };

//   useEffect(() => {
//     // Load model-viewer library
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
//     document.head.appendChild(script);
    
//     script.onload = () => {
//       setLoading(false);
      
//       // When the library is loaded, we can create and set up the viewer
//       const viewer = document.querySelector('model-viewer');
//       if (viewer) {
//         // Set up event listeners for the model-viewer
//         viewer.addEventListener('load', () => {
//           setModelLoaded(true);
//         });
        
//         viewer.addEventListener('error', (error) => {
//           setError(`Failed to load model: ${error.detail.type}`);
//         });
        
//         // Apply model transformations or materials if needed
//         viewer.addEventListener('model-visibility', (event) => {
//           if (event.detail.visible) {
//             console.log('Model is now visible');
//             // Here you could potentially call a function to apply textures
//           }
//         });
//       }
//     };
    
//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading AR Viewer...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <h2>Error Loading Model</h2>
//         <p>{error}</p>
//         <Link to="/">Return to Configurator</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="ar-viewer-page">
//       <div className="ar-header">
//         <Link to="/" className="back-button">← Back to Configurator</Link>
//         <h1>AR Viewer</h1>
//       </div>
      
//       <div className="model-info">
//         <p>Model: {modelId}</p>
//         <p>Wood Finish: {woodFinish}</p>
//         <p>Handle: {handleType} - {handleFinish}</p>
//         <p>Leg Option: {legOption}</p>
//       </div>
      
//       <div className="ar-viewer-container" ref={viewerRef}>
//         <model-viewer
//           id="ar-model"
//           alt={`${modelId} furniture model`}
//           src={mainModelPath}
//           ar
//           ar-modes="webxr scene-viewer quick-look"
//           environment-image="/565/flamingo_pan_1k.hdr"
//           shadow-intensity="1"
//           camera-controls
//           touch-action="pan-y"
//           style={{ width: "100%", height: "70vh" }}
//         >
//           <button
//             slot="ar-button"
//             style={{
//               backgroundColor: "white",
//               borderRadius: "4px",
//               border: "none",
//               position: "absolute",
//               top: "16px",
//               right: "16px",
//               padding: "8px 12px",
//               fontSize: "14px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px"
//             }}
//           >
//             <span style={{ fontSize: "20px" }}>👋</span> View in Your Space
//           </button>
          
//           <div className="ar-loading-indicator" slot="poster">
//             <div className="spinner"></div>
//             Loading 3D Model...
//           </div>
//         </model-viewer>
//       </div>
      
//       <div className="ar-instructions">
//         <h3>How to use AR view:</h3>
//         <ol>
//           <li>Tap the "View in Your Space" button</li>
//           <li>Point your camera at a flat surface</li>
//           <li>Move your device until the furniture appears</li>
//           <li>You can move and rotate the model in your space</li>
//         </ol>
//         <p className="note">Note: AR functionality requires a compatible mobile device.</p>
//       </div>
//     </div>
//   );
// };


// export default ARViewer;








