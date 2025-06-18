"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function Book() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Book Cover */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>

      {/* Book Pages */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.9, 2.9, 0.15]} />
        <meshStandardMaterial color="#F3F4F6" />
      </mesh>

      {/* Book Title */}
      <Center position={[0, 0.5, 0.2]}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.2} height={0.02} curveSegments={12}>
          WRITERS
          <meshStandardMaterial color="#FFFFFF" />
        </Text3D>
      </Center>
    </group>
  )
}

export function ThreeDBook() {
  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Book />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
