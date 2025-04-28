
// import * as THREE from 'three';
// import { getTexturePaths } from './getTexturePaths';

// export function applyWoodTexture(model, textureOption, selectedSize, furnitureOptions) {
//   if (!model || !textureOption || !selectedSize || !furnitureOptions) {
//     console.error('Missing parameters for applyWoodTexture:', { 
//       hasModel: !!model, 
//       hasTexture: !!textureOption, 
//       selectedSize, 
//       hasFurnitureOptions: !!furnitureOptions 
//     });
//     return;
//   }
  
//   const textureLoader = new THREE.TextureLoader();
//   const { texturePath, roughnessPath } = getTexturePaths(textureOption, selectedSize, furnitureOptions);
  
//   if (!texturePath || !roughnessPath) {
//     console.error('Invalid texture paths:', { texturePath, roughnessPath });
//     return;
//   }

//   // Load the texture
//   textureLoader.load(
//     texturePath, 
//     (texture) => {
//       texture.wrapS = THREE.RepeatWrapping;
//       texture.wrapT = THREE.RepeatWrapping;

//       // Load the roughness map
//       textureLoader.load(
//         roughnessPath, 
//         (roughnessTexture) => {
//           // Apply textures to all meshes in the model
//           model.traverse((object) => {
//             if (object.isMesh) {
//               object.material = new THREE.MeshStandardMaterial({
//                 map: texture,
//                 roughnessMap: roughnessTexture,
//                 color: new THREE.Color(textureOption.color),
//                 roughness: 0.7,
//                 metalness: 0.1,
//               });
//             }
//           });
//         },
//         undefined, // onProgress callback not needed
//         (error) => console.error('Error loading roughness texture:', error)
//       );
//     },
//     undefined, // onProgress callback not needed
//     (error) => console.error('Error loading color texture:', error)
//   );
// }

import * as THREE from 'three';
import { getTexturePaths } from './getTexturePaths';

export function applyWoodTexture(model, textureOption, selectedSize, furnitureOptions, flipVertical = false) {
  if (!model || !textureOption || !selectedSize || !furnitureOptions) {
    console.error('Missing parameters for applyWoodTexture:', { 
      hasModel: !!model, 
      hasTexture: !!textureOption, 
      selectedSize, 
      hasFurnitureOptions: !!furnitureOptions 
    });
    return;
  }
  
  const textureLoader = new THREE.TextureLoader();
  const { texturePath, roughnessPath } = getTexturePaths(textureOption, selectedSize, furnitureOptions);
  
  if (!texturePath || !roughnessPath) {
    console.error('Invalid texture paths:', { texturePath, roughnessPath });
    return;
  }

  // Load the texture
  textureLoader.load(
    texturePath, 
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      
      // Set repeat to flip texture vertically if needed
      texture.repeat.set(1, flipVertical ? -1 : 1);
      
      // Set offset to properly position flipped texture
      texture.offset.set(0, flipVertical ? 1 : 0);

      // Load the roughness map
      textureLoader.load(
        roughnessPath, 
        (roughnessTexture) => {
          roughnessTexture.wrapS = THREE.RepeatWrapping;
          roughnessTexture.wrapT = THREE.RepeatWrapping;
          
          // Apply the same vertical flip to roughness texture
          roughnessTexture.repeat.set(1, flipVertical ? -1 : 1);
          roughnessTexture.offset.set(0, flipVertical ? 1 : 0);

          // Apply textures to all meshes in the model
          model.traverse((object) => {
            if (object.isMesh) {
              object.material = new THREE.MeshStandardMaterial({
                map: texture,
                roughnessMap: roughnessTexture,
                color: new THREE.Color(textureOption.color),
                roughness: 0.7,
                metalness: 0.1,
              });
            }
          });
        },
        undefined,
        (error) => console.error('Error loading roughness texture:', error)
      );
    },
    undefined,
    (error) => console.error('Error loading color texture:', error)
  );
}