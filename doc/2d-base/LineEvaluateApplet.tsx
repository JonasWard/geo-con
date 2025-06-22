import { Line, OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { V2 } from '../../src/js/2d-base/types';
import { add, scale, tParameterOnRay } from '../../src/js/2d-base';
import { radians } from '../../src/js/1d-base';
import { V2Point } from './V2Point';

const Vector2FromV2 = (v: V2) => new THREE.Vector2(v.x, -v.y);

const LineScene: React.FC<{ v: V2; a: number }> = ({ v, a }) => {
  const { camera, mouse } = useThree();
  const lineDir: V2 = { x: Math.cos(a), y: Math.sin(a) };
  const planeRef = useRef(null);
  const [p, setP] = useState<V2 | null>(null);

  useFrame(() => {
    if (!planeRef.current) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(planeRef.current);

    if (intersects.length > 0) setP({ x: intersects[0].point.x, y: -intersects[0].point.y });
  });

  const t = p ? tParameterOnRay(v, lineDir, p) : undefined;

  return (
    <>
      {/* Infinite line visualized as a long segment */}
      <Line
        points={[add(v, scale(lineDir, -1e6)), add(v, scale(lineDir, 1e6))].map(Vector2FromV2)}
        color="blue"
        lineWidth={2}
      />

      <mesh ref={planeRef} receiveShadow position={[0, 0, -1]}>
        <planeGeometry args={[1e6, 1e6]} />
        <meshStandardMaterial color="white" side={THREE.DoubleSide} />
      </mesh>

      <V2Point v={v} color="blue" />

      {/* Draggable query point */}
      {p && (
        <>
          <V2Point v={p} />
          {t && <V2Point v={add(v, scale(lineDir, t))} label={t.toFixed(3)} />}
        </>
      )}
    </>
  );
};

export const LineEvaluateApplet = () => {
  const [v, setV] = useState<V2>({ x: 0, y: 0 });
  const [a, setA] = useState<number>(0);

  return (
    <div className="absolute l-0 t-0 w-[100svw] h-[100svh]">
      <div className="absolute l-0 t-0 z-1">
        <input value={v.x} onChange={(e) => setV({ ...v, x: Number(e.target.value) ?? 0 })} placeholder="x" />
        <input value={v.y} onChange={(e) => setV({ ...v, y: Number(e.target.value) ?? 0 })} placeholder="y" />
        <input value={a} onChange={(e) => setA(Number(e.target.value) ?? 0)} placeholder="a" />
      </div>
      <Canvas orthographic camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <LineScene v={v} a={radians(a)} />
      </Canvas>
    </div>
  );
};
