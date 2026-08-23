import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function HeroFireflies() {
  return (
    <Canvas
      className="pointer-events-none"
      style={{ position: "absolute", inset: 0, zIndex: 5 }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.75]}
    >
      <Sparkles
        count={70}
        scale={[10, 5.5, 3]}
        size={2.6}
        speed={0.22}
        opacity={0.6}
        color="#e8c274"
        noise={1.1}
      />
      <Sparkles
        count={45}
        scale={[10, 5.5, 3]}
        size={1.1}
        speed={0.12}
        opacity={0.35}
        color="#f3ead3"
        noise={0.6}
      />
    </Canvas>
  );
}
