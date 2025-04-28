import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductConfigurator from "./ProductConfigurator";
import { ConfiguratorProvider } from "./ConfiguratorContext";

// Import your initial options
import initialOptions from "../data/initialOptions"; // Adjust path as needed

const ConfiguratorPage = () => {
  const [searchParams] = useSearchParams();

  // Create a modified version of initialOptions with parameters from URL
  const getModifiedOptions = () => {
    // Create a deep clone of initialOptions to avoid mutations
    const options = JSON.parse(JSON.stringify(initialOptions));
    
    // Extract parameters from URL - note we're using "size" instead of "sizeId"
    const sizeId = searchParams.get("size"); // Changed from "sizeId" to "size"
    const woodFinishId = searchParams.get("woodFinish");
    const handleTypeId = searchParams.get("handleType");
    const handleFinishId = searchParams.get("handleFinish");
    const legOptionId = searchParams.get("legOption");
    
    // Log parameters for debugging
    console.log("URL Parameters:", { 
      size: sizeId, 
      woodFinish: woodFinishId, 
      handleType: handleTypeId,
      handleFinish: handleFinishId,
      legOption: legOptionId
    });
    
    // Find matching options and set them as default (index 0)
    if (sizeId) {
      const foundSize = options.furnitureOptions.find(o => o.id === sizeId);
      if (foundSize) {
        // Move the found option to be first in the array
        const index = options.furnitureOptions.indexOf(foundSize);
        options.furnitureOptions.splice(index, 1);
        options.furnitureOptions.unshift(foundSize);
      }
    }
    
    if (woodFinishId) {
      const foundWoodFinish = options.woodFinishOptions.find(o => o.id === woodFinishId);
      if (foundWoodFinish) {
        const index = options.woodFinishOptions.indexOf(foundWoodFinish);
        options.woodFinishOptions.splice(index, 1);
        options.woodFinishOptions.unshift(foundWoodFinish);
      }
    }
    
    if (handleTypeId) {
      const foundHandleType = options.handleOptions.find(o => o.id === handleTypeId);
      if (foundHandleType) {
        const index = options.handleOptions.indexOf(foundHandleType);
        options.handleOptions.splice(index, 1);
        options.handleOptions.unshift(foundHandleType);
      }
    }
    
    if (handleFinishId) {
      const foundHandleFinish = options.handleFinishOptions.find(o => o.id === handleFinishId);
      if (foundHandleFinish) {
        const index = options.handleFinishOptions.indexOf(foundHandleFinish);
        options.handleFinishOptions.splice(index, 1);
        options.handleFinishOptions.unshift(foundHandleFinish);
      }
    }
    
    if (legOptionId) {
      const foundLegOption = options.legOptions.find(o => o.id === legOptionId);
      if (foundLegOption) {
        const index = options.legOptions.indexOf(foundLegOption);
        options.legOptions.splice(index, 1);
        options.legOptions.unshift(foundLegOption);
      }
    }
    
    return options;
  };

  // Get modified options with URL parameters applied
  const modifiedOptions = getModifiedOptions();

  return (
    <ConfiguratorProvider initialOptions={modifiedOptions}>
      <ProductConfigurator />
    </ConfiguratorProvider>
  );
};

export default ConfiguratorPage;