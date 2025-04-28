import { Billboard, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Box3, Vector3 } from "three";
import DimensionLine from "./DimensionLine";



export default function DimensionHelper({ objectRef }) {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    if (objectRef.current) {
      const box = new Box3().setFromObject(objectRef.current);
      const size = new Vector3();
      box.getSize(size);
      console.log(size);


      setDimensions({ size, box });
    }
  }, [objectRef]);
  if(!objectRef) return null;
  if (!dimensions) return null;

  const { size, box } = dimensions;
  const min = box.min;
  const max = box.max;
  console.log(min);

  return (
    <>
      {/* X Axis Line */}
      <DimensionLine
        start={[min.x, min.y - 0.1, min.z]}
        end={[max.x, min.y - 0.1, min.z]}
        label={
          <Billboard>
            <meshBasicMaterial attach="material" />
            <Text fontSize={0.08} color="black" anchorX="center" anchorY="middle">
              {`${size.x.toFixed(2)}m`}
            </Text>
          </Billboard>
        }
      />
      {/* Y Axis Line */}
      <DimensionLine
        start={[max.x + 0.1, min.y, min.z]}
        end={[max.x + 0.1, max.y, min.z]}
        label={
          <Billboard>
            <meshBasicMaterial attach="material" />
            <Text fontSize={0.08} color="black" anchorX="center" anchorY="middle">
              {`${size.y.toFixed(2)}m`}
            </Text>
          </Billboard>
        }
      />
    
      <DimensionLine
        start={[min.x, min.y - 0.1, min.z]}
        end={[min.x, min.y - 0.1, max.z]}
        label={
          <Billboard>
            <meshBasicMaterial attach="material" />
            <Text fontSize={0.08} color="black" anchorX="center" anchorY="middle">
              {`${size.z.toFixed(2)}m`}
            </Text>
          </Billboard>
        }
        />
      
    </>
  );
}

