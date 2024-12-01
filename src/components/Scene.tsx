import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Data {
  id: string;
  color: string;
  topic: string;
}
// Easing function for smooth transitions
const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const Scene = ({ data }: { data: Data[] }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorToData = (color: string) => {
    return data.find((d) => d.color === `#${color}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows>
          <ambientLight intensity={0.5} castShadow />
          <pointLight position={[10, 10, 10]} castShadow />
          <Spinner setSelectedColor={setSelectedColor} data={data} />
          {/* CAMERA */}
          <mesh position={[0, 0, 10]}>
            <perspectiveCamera
              position={[0, 0, 10]}
              fov={50}
              aspect={window.innerWidth / window.innerHeight}
              near={0.1}
              far={100}
            />
          </mesh>
        </Canvas>
      </div>

      {
        // Display topic if color is selected center
        selectedColor && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "10px 15px",
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid #fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              fontSize: "50px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {colorToData(selectedColor)?.topic}
          </div>
        )
      }
    </>
  );
};

interface SpinnerProps {
  setSelectedColor: (color: string) => void;
  data: Data[];
}

const Spinner = ({ setSelectedColor, data }: SpinnerProps) => {
  const rotatingCube = useRef<THREE.Mesh>(null);
  const cylinders = useRef<THREE.Mesh[]>([]);
  const raycaster = useRef(new THREE.Raycaster());
  const [spin, setSpin] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const spinStartTime = useRef<number | null>(null);
  const spinDuration = useRef<number>(0);

  const handleClick = () => {
    if (!spin) {
      setSpin(true);
      spinStartTime.current = performance.now();
      spinDuration.current = Math.random() * 3000 + 5000; // 3 to 5 seconds
    }
  };

  useFrame(() => {
    if (rotatingCube.current && spinStartTime.current !== null) {
      const elapsed = performance.now() - spinStartTime.current;

      if (elapsed < spinDuration.current) {
        const progress = elapsed / spinDuration.current;
        const easedProgress = easeInOutQuad(progress);

        // Apply eased progress directly to rotation
        const deltaRotation = easedProgress * 0.55; // Adjust multiplier for speed
        rotatingCube.current.rotation.z += deltaRotation;
      } else {
        setSpin(false);
        setRotationSpeed(0);
        setHighlightedIndex(null); // Reset highlight after spinning stops
        spinStartTime.current = null;
      }

      // Raycasting logic
      const origin = new THREE.Vector3();
      rotatingCube.current.getWorldPosition(origin);

      const direction = new THREE.Vector3(0, -1, 0).applyQuaternion(
        rotatingCube.current.quaternion
      );
      raycaster.current.set(origin, direction);

      const intersects = raycaster.current.intersectObjects(cylinders.current);
      if (intersects.length > 0) {
        const firstIntersect = intersects[0];
        const index = cylinders.current.indexOf(
          firstIntersect.object as THREE.Mesh
        );
        setHighlightedIndex(index); // Update highlighted cylinder index
        const material = (firstIntersect.object as THREE.Mesh)
          .material as THREE.MeshStandardMaterial;
        if (material) {
          setSelectedColor(material.color.getHexString());
        }
      }

      // Update cylinder materials
      cylinders.current.forEach((cylinder, index) => {
        const material = cylinder.material as THREE.MeshStandardMaterial;
        if (material) {
          material.emissive.set(
            index === highlightedIndex ? "#ffffff" : "#000000"
          );
          material.emissiveIntensity = index === highlightedIndex ? 0.5 : 0.1;
        }
      });
    }
  });

  return (
    <group onClick={handleClick}>
      {/* Rotating Cube */}
      <mesh
        ref={rotatingCube}
        position={[0, 0, 0]}
        onClick={handleClick} // Add click interaction
      >
        {/* <boxGeometry args={[0.25, 4, 1]} /> */}
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>

      {/* Cylinders in Circular Arrangement */}
      {Array.from({ length: data.length }).map((_, i) => {
        const angle = (i / data.length) * Math.PI * 2;
        const x = 3 * Math.cos(angle);
        const y = 3 * Math.sin(angle);

        return (
          <group key={i}>
            <mesh
              key={i}
              ref={(mesh) => mesh && (cylinders.current[i] = mesh)}
              position={[x, y, 0.1]} // Adjusted height for better visual balance
              rotation={[0, 0, Math.PI / 2 + angle]}
            >
              <cylinderGeometry args={[1.5, 2, 1, 32]} />
              <meshStandardMaterial color={data[i].color} emissive={"black"} />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.5, 4, 0.01, 64]} />
        <meshStandardMaterial color={"#fff"} transparent opacity={0.7} />
      </mesh>

      <mesh position={[0, 0, 2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 2.0, 0.01, 64]} />
        <meshStandardMaterial color={"#000"} />
      </mesh>
    </group>
  );
};
