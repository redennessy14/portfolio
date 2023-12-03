import {
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import "./ModelWithAnimation.css";
import * as THREE from "three";

const AnimatedStars = () => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.001; // Изменяем угол поворота звезд на каждом кадре
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={4}
      saturation={5}
      fade
      color={0xff0000}
    />
  );
};
const ModelWithAnimation = () => {
  const gltf = useGLTF("/model/blackhole/scene.gltf");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive object={gltf.scene} position={[0, -3, -20]} ref={modelRef} />
  );
};

const Astronaut = () => {
  const gltf = useGLTF("/model/astronaut/scene.gltf");
  const modelRef = useRef();

  return <primitive object={gltf.scene} ref={modelRef} position={[0, -1, 0]} />;
};

const Model = () => {
  const [cameraPosition, setCameraPosition] = useState([-2, 2, 3]);

  const handleMoveCamera = (position) => {
    setCameraPosition(position);
  };
  return (
    <div className="canvas-container">
      <div className="button-container">
        <button onClick={() => handleMoveCamera([10, 10, 10])}>
          Position 1
        </button>
        <button onClick={() => handleMoveCamera([0, 0, 5])}>Position 2</button>
        {/* Добавьте другие кнопки и позиции, если необходимо */}
      </div>
      <Canvas className="canvas" camera={{ position: cameraPosition, fov: 65 }}>
        {/* Освещение */}
        <ambientLight intensity={4} color="white" />
        <pointLight position={[10, 10, 10]} intensity={4} color="white" />
        {/* Точечный свет */}
        <directionalLight position={[-5, 5, 5]} intensity={4} color="white" />
        {/* Направленный свет */}
        {/* Загрузка модели */}
        <ModelWithAnimation />

        {/* Управление камерой */}

        <OrbitControls

        //   minPolarAngle={Math.PI / 3} // Минимальный угол обзора
        //   maxPolarAngle={Math.PI / 3} // Максимальный угол обзора
        //   minDistance={5} // Минимальное расстояние до объекта
        //   maxDistance={5} // Максимальное расстояние до объекта
        />
        <Astronaut />

        <AnimatedStars />
      </Canvas>
    </div>
  );
};
export default Model;
