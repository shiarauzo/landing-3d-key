"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const MODEL = "/models/hand.glb";

// Frame-rate-independent damping factor.
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function Hand() {
  const { scene } = useGLTF(MODEL);
  const follow = useRef<THREE.Group>(null);

  // Clone, apply a white wireframe material, center + normalize scale.
  const model = useMemo(() => {
    const root = scene.clone(true);
    const mat = new THREE.MeshBasicMaterial({
      color: "#ededea",
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.material = mat;
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    root.position.sub(center);
    root.scale.setScalar(4.4 / Math.max(size.x, size.y, size.z));
    const wrap = new THREE.Group();
    wrap.add(root);
    // Reaching pose for the full hand + forearm.
    wrap.rotation.set(0.2, 0.5, -0.45);
    return wrap;
  }, [scene]);

  useFrame((state, dt) => {
    if (!follow.current) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    // Always follow the cursor — rotate strongly toward it, drift gently.
    follow.current.rotation.y = damp(follow.current.rotation.y, x * 0.7, 3.5, dt);
    follow.current.rotation.x = damp(follow.current.rotation.x, -y * 0.5, 3.5, dt);
    follow.current.rotation.z = Math.sin(t * 0.4) * 0.02;
    follow.current.position.x = damp(follow.current.position.x, x * 0.5, 3.5, dt);
    follow.current.position.y = damp(
      follow.current.position.y,
      1.75 + y * 0.3 + Math.sin(t * 0.6) * 0.05,
      3.5,
      dt,
    );
  });

  return (
    <group ref={follow} position={[0, 1.75, 0]}>
      <primitive object={model} />
    </group>
  );
}
useGLTF.preload(MODEL);

function Stars({ count = 120 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = (n: number) => ((Math.sin(i * n) * 43758.5453) % 1 + 1) % 1;
      arr[i * 3] = r(12.9898) * 20 - 10;
      arr[i * 3 + 1] = r(78.233) * 13 - 6.5;
      arr[i * 3 + 2] = r(37.719) * 8 - 7;
    }
    return arr;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Experience() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Hand />
      </Suspense>
      <Stars />
    </Canvas>
  );
}
