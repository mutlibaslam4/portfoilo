"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useRef, type ReactNode } from "react";
import { MathUtils, type Group } from "three";

function Orb() {
  const group = useRef<Group>(null);

  useFrame(({ pointer, clock }, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.25;
    g.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.2;
    // subtle pointer parallax
    g.position.x = MathUtils.damp(g.position.x, pointer.x * 0.5, 4, delta);
    g.position.y = MathUtils.damp(g.position.y, pointer.y * 0.35, 4, delta);
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5}>
        <mesh scale={1.7}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial color="#43e36d" wireframe distort={0.35} speed={2} />
        </mesh>
      </Float>
    </group>
  );
}

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero3D() {
  return (
    <Boundary>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={2} color="#7cf0a0" />
        <Orb />
      </Canvas>
    </Boundary>
  );
}
