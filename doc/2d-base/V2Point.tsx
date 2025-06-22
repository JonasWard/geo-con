import { Text } from '@react-three/drei';
import { V2 } from '../../src/js/2d-base/types';

export const V2Point: React.FC<{ v: V2; color?: string; label?: string }> = ({ v, color = 'red', label }) => (
  <>
    {label && (
      <Text fontSize={20} anchorX="left" anchorY="bottom" position={[v.x, -v.y, 0]}>
        {label}
      </Text>
    )}
    <mesh position={[v.x, -v.y, 0]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </>
);
