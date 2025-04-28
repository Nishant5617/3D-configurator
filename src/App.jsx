import React from 'react';
import { ConfiguratorProvider } from './components/ConfiguratorContext';
import RouterComponent from './Router';
import './App.css';

// Define your options here
export const options = {
  furnitureOptions: [
    { id: '565-01', name: 'Single Drawer', image:'ICONS/565-01.png.png', modelPath: '565/565-01/565-01.glb' },
    { id: '565-02', name: 'Three Drawer', image:'ICONS/565-02.png.png' , modelPath: '565/565-02/565-02.glb' },
    { id: '565-04', name: 'Single Wardrobe', image: 'ICONS/565-04.png.png', modelPath: '565/565-04/565-04.glb' },
    { id: '565-05', name: 'Double Wardrobe', image: 'ICONS/565-05.png.png', modelPath: '565/565-05/565-05.glb' },
    { id: '565-06', name: 'Footboard', image: "/api/placeholder/80/80", modelPath: '565/565-06/565-06.glb' },
    
  ],
  woodFinishOptions: [
    { id: 'cafelle', name: 'Cafelle', color: '#362617', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cafelle.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'amber', name: 'Amber', color: '#8B5A2B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Amber.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'bitmore', name: 'Bitmore', color: '#4A2511', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Bitmore.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'brighton', name: 'Brighton', color: '#352315', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Brighton.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'cocoballa', name: 'Cocoballa', color: '#3D2B1F', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cocoballa.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'columbian', name: 'Columbian', color: '#4F3222', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Columbian.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'empire', name: 'Empire', color: '#462913', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Empire.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'fonthill', name: 'Fonthill', color: '#A16C38', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Fonthill.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'macadamia', name: 'Macadamia Nut', color: '#9C8E7B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Macadamia Nut.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'naturalash', name: 'Natural Ash', color: '#E5D7B7', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Natural Ash.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'raya', name: 'Raya', color: '#5B5B40', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Raya.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'rivercherry', name: 'River Cherry', color: '#B68E5B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/River Cherry.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'studioteak', name: 'Studio Teak', color: '#6A6D56', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Studio Teak.png', 
      roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'whitecypress', name: 'White Cypress', color: '#D3C9B6', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/White Cypress.png', 
      roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'williamsburg', name: 'Williamsburg', color: '#4D2C19', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Williamsburg.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'windsor', name: 'Windsor', color: '#95432F', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Windsor.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png'},
  ],
  handleOptions: [
    { id: 'handle-1', name: 'Handle 1', image: 'ICONS/handle_1.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 1.glb' },
    { id: 'handle-2', name: 'Handle 2', image: 'ICONS/handle_2.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 2.glb' },
    { id: 'handle-3', name: 'Handle 3', image: "ICONS/handle_3.jpg", modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 3.glb' },
    { id: 'handle-4', name: 'Handle 4', image: 'ICONS/handle_4.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 4.glb' },
    { id: 'handle-5', name: 'Handle 5', image: 'ICONS/handle_5.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 5.glb' },
  ],
  handleFinishOptions: [
    { id: 'antique-english', name: 'Antique English', color: '#704214', modelPath: '565/Handle Finishs/Antique English.jpg'},
    { id: 'brushed-nickel', name: 'Brushed Nickel', color: '#C0C0C0', modelPath: '565/Handle Finishs/Brushed Nickel.jpg' },
    { id: 'satin-nickel', name: 'satin-nickel', color: '#352A20', modelPath: '565/Handle Finishs/Satin Nickel.jpg'},
  ],
  legOptions: [
    {id: 'leg-a', name: 'Leg A', image: 'ICONS/leg A.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg A.glb'},
    {id: 'leg-b', name: 'Leg B', image: 'ICONS/Leg B.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg B.glb'},
    {id: 'leg-c', name: 'Leg C', image: 'ICONS/Leg C.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg C.glb'},
    {id: 'leg-d', name: 'Leg D', image: 'ICONS/Leg D.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg D.glb'}
  ]
};

function App() {
  return (
    <ConfiguratorProvider initialOptions={options}>
      <RouterComponent />
    </ConfiguratorProvider>
  );
}

export default App;