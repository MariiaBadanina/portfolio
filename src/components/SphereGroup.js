import { MarchingCube, MarchingCubes } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Depth, LayerMaterial } from "lamina"
import { useRef } from "react"
import Cursor from "./Cursor"

const Sphere = ({ x, y, z, s }) => {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.x = x / 1.5 + Math.sin((t * s) / 2) * 0.2
    ref.current.position.y = y / 1.5 + Math.sin((t * s) / 2) * 0.2
    ref.current.position.z = z / 1.5 + Math.sin((t * s) / 2) * 0.2
  })

  return <MarchingCube ref={ref} />
}

const SphereGroup = () => {
  const data = new Array(10).fill().map((_, i) => ({
    x: Math.random() * 1 - 0.5,
    y: Math.random() * 1 - 0.5,
    z: Math.random() * 1 - 0.5,
    s: Math.random() + 2,
  }))

  return (
    <MarchingCubes resolution={64} enableColors>
      <LayerMaterial lighting="standard" color="yellow" toneMapped={true}>
        <Depth
          colorA="#2A8AFF"
          colorB="#ff4eb8"
          alpha={1}
          mode="multiply"
          near={0.0}
          far={0.9}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
      {data.map((props, i) => (
        <Sphere key={i} {...props} />
      ))}
      <Cursor />
    </MarchingCubes>
  )
}

export default SphereGroup
