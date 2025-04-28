// export function getTexturePaths(textureOption, selectedSize, furnitureOptions) {
//     const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
//     if (!selectedFurniture) return { texturePath: '', roughnessPath: '' };
  
//     const furnitureId = selectedFurniture.id;
//     const furnitureSize = selectedSize.replace(' ', '%20');
  
//     const texturePath = textureOption.texturePathTemplate
//       .replace(/{furnitureId}/g, furnitureId)
//       .replace(/{furnitureSize}/g, furnitureSize);
  
//     const roughnessPath = textureOption.roughnessTexturePathTemplate
//       .replace(/{furnitureId}/g, furnitureId)
//       .replace(/{furnitureSize}/g, furnitureSize);
  
//     return { texturePath, roughnessPath };
//   }
export function getTexturePaths(textureOption, selectedSize, furnitureOptions) {
    if (!textureOption || !selectedSize || !furnitureOptions) {
      console.error('Missing parameters for getTexturePaths');
      return { texturePath: '', roughnessPath: '' };
    }
  
    // Find the furniture by name or id
    const selectedFurniture = typeof selectedSize === 'string'
      ? furnitureOptions.find(option => option.name === selectedSize || option.id === selectedSize)
      : selectedSize;
  
    if (!selectedFurniture) {
      console.error('Selected furniture not found:', selectedSize);
      return { texturePath: '', roughnessPath: '' };
    }
  
    const furnitureId = selectedFurniture.id;
    
    // Create paths by replacing placeholders
    const texturePath = textureOption.texturePathTemplate
      .replace(/{furnitureId}/g, furnitureId);
  
    const roughnessPath = textureOption.roughnessTexturePathTemplate
      .replace(/{furnitureId}/g, furnitureId);
  
    return { texturePath, roughnessPath };
  }