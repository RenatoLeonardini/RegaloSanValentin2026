import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, TorusKnot } from '@react-three/drei';

const RotatingModel = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5; // Auto-rotate
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                {/* Placeholder for Lilies Bouquet - using a TorusKnot for now */}
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color="#ff69b4"
                    roughness={0.3}
                    metalness={0.1}
                    emissive="#550022"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
};

const Scene3D = ({ opacity = 1, scale = 1 }) => {
    return (
        <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-out"
            style={{ opacity, transform: `scale(${scale})` }}
        >
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffdddd" />
                <pointLight position={[-10, -5, -10]} intensity={0.5} color="#cc99ff" />

                <RotatingModel />

                <Environment preset="sunset" />
            </Canvas>
        </div>
    );
};

export default Scene3D;
