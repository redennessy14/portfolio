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

  return <Stars ref={starsRef} />;
};
const ModelWithAnimation = () => {
  const gltf = useGLTF("/model/blackhole/scene.gltf");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive object={gltf.scene} position={[0, -1, 0]} ref={modelRef} />;
};

const Model = () => {
  return (
    <div className="canvas-container">
      <Canvas className="canvas">
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
        <AnimatedStars />
      </Canvas>
    </div>
  );
};
export default Model;
