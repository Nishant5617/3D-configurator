import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import SceneContent from "./SceneContent";
import QRCodeModal from "./QrCodeModal";
import { useConfigurator } from "./ConfiguratorContext";

const ProductConfigurator = () => {
  const { state, actions } = useConfigurator();
  const [searchParams] = useSearchParams();
  const {
    selectedSize,
    woodFinish,
    handleType,
    handleFinish,
    legOption,
    showQR,
    arUrl,
    options,
  } = state;
  const {
    setSelectedSize,
    setWoodFinish,
    setHandleType,
    setHandleFinish,
    setLegOption,
    setShowQR,
  } = actions;

  // Effect to sync URL parameters with state
  useEffect(() => {
    // Extract parameters from URL
    const sizeId = searchParams.get("size");
    const woodFinishId = searchParams.get("woodFinish");
    const handleTypeId = searchParams.get("handleType");
    const handleFinishId = searchParams.get("handleFinish");
    const legOptionId = searchParams.get("legOption");
    
    // Update state based on URL parameters
    if (sizeId) {
      const foundSize = options.furnitureOptions.find(o => o.id === sizeId);
      if (foundSize && foundSize.id !== selectedSize?.id) {
        setSelectedSize(foundSize);
      }
    }
    
    if (woodFinishId) {
      const foundWoodFinish = options.woodFinishOptions.find(o => o.id === woodFinishId);
      if (foundWoodFinish && foundWoodFinish.id !== woodFinish?.id) {
        setWoodFinish(foundWoodFinish);
      }
    }
    
    if (handleTypeId) {
      const foundHandleType = options.handleOptions.find(o => o.id === handleTypeId);
      if (foundHandleType && foundHandleType.id !== handleType?.id) {
        setHandleType(foundHandleType);
      }
    }
    
    if (handleFinishId) {
      const foundHandleFinish = options.handleFinishOptions.find(o => o.id === handleFinishId);
      if (foundHandleFinish && foundHandleFinish.id !== handleFinish?.id) {
        setHandleFinish(foundHandleFinish);
      }
    }
    
    if (legOptionId) {
      const foundLegOption = options.legOptions.find(o => o.id === legOptionId);
      if (foundLegOption && foundLegOption.id !== legOption?.id) {
        setLegOption(foundLegOption);
      }
    }
  }, [searchParams, options, setSelectedSize, setWoodFinish, setHandleType, setHandleFinish, setLegOption]);

  // Handle closing the QR modal
  const handleCloseQRModal = () => {
    setShowQR(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>3D Product Configurator</h1>
        <p>
          Real-time 3D customization that brings furniture to
          life—change colors, materials, and features with ease.
        </p>
      </div>
      <div className="content-wrapper">
        <div className="viewer-container">
          <Canvas
            camera={{ position: [1.2, 1.2, 1.2], fov: 45 }}
            style={{ background: "#f5f5f5" }}
          >
            <Suspense fallback={<Html center>Loading...</Html>}>
              <SceneContent
                selectedSize={selectedSize}
                woodFinish={woodFinish}
                handleType={handleType}
                handleFinish={handleFinish}
                legOption={legOption}
                furnitureOptions={options.furnitureOptions}
                woodFinishOptions={options.woodFinishOptions}
                handleOptions={options.handleOptions}
                handleFinishOptions={options.handleFinishOptions}
                legOptions={options.legOptions}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="config-container">
          <h2>Ancestry</h2>
          <p>
            With Ancestry Collection the best from generation to
            generation is carried forward.
          </p>
          <br />
          <div>
            <label>Select Size:</label>
            <select
              value={selectedSize?.id || ''}
              onChange={(e) =>
                setSelectedSize(
                  options.furnitureOptions.find(
                    (option) => option.id === e.target.value
                  )
                )
              }
            >
              {options.furnitureOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label> Select Wood Finish:</label>
            <select
              value={woodFinish?.id || ''}
              onChange={(e) =>
                setWoodFinish(
                  options.woodFinishOptions.find(
                    (option) => option.id === e.target.value
                  )
                )
              }
            >
              {options.woodFinishOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label> Select Handle Type:</label>
            <select
              value={handleType?.id || ''}
              onChange={(e) =>
                setHandleType(
                  options.handleOptions.find(
                    (option) => option.id === e.target.value
                  )
                )
              }
            >
              {options.handleOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label> Select Handle Finish:</label>
            <select
              value={handleFinish?.id || ''}
              onChange={(e) =>
                setHandleFinish(
                  options.handleFinishOptions.find(
                    (option) => option.id === e.target.value
                  )
                )
              }
            >
              {options.handleFinishOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Leg Option:</label>
            <select
              value={legOption?.id || ''}
              onChange={(e) =>
                setLegOption(
                  options.legOptions.find(
                    (option) => option.id === e.target.value
                  )
                )
              }
            >
              {options.legOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQR} 
        onClose={handleCloseQRModal} 
        arUrl={arUrl} 
      />
    </div>
  );
};

export default ProductConfigurator;