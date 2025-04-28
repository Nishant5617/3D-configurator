import { Line, Text } from '@react-three/drei'

export default function DimensionLine({ start, end, label }) {
  const midPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ]

  return (
    <group>
      <Line points={[start, end]} color="black" lineWidth={1} />
      <Text
        position={midPoint}
        fontSize={0.05}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

