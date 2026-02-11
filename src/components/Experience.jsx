import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
    MeshDistortMaterial,
    TorusKnot,
    SoftShadows,
    SpotLight,
    Html
} from '@react-three/drei';
import FloatingImage from './FloatingImage';
import { easing } from 'maath';

const IMAGES = [
    "/assets/photo1.jpg",
    "/assets/photo2.jpg",
    "/assets/photo3.jpg",
    "/assets/photo4.jpg",
    "/assets/photo5.jpg",
    "/assets/photo6.jpg",
    "/assets/photo7.jpg",
    "/assets/photo9.jpg",
    "/assets/photo10.jpg",
    "/assets/photo11.jpg",
    "/assets/photo12.jpg",
    "/assets/photo1.jpg",
];

// Grid Layout Calculation
// 3 Rows x 4 Columns
const ROWS = 3;
const COLS = 4;
// Adjusted spacing for Taller Portrait Images
const SPACING_X = 2.8;
const SPACING_Y = 3.0;

function getGridPosition(index) {
    const row = Math.floor(index / COLS);
    const col = index % COLS;

    // Center the grid
    const x = (col - (COLS - 1) / 2) * SPACING_X;
    const y = ((ROWS - 1) / 2 - row) * SPACING_Y;

    return [x, y, 0];
}

const AbstractCenterpiece = ({ active }) => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;

        // Move it back when active to not block view
        easing.damp3(meshRef.current.position, active ? [0, 0, -20] : [0, 0, 0], 0.4, delta);
    });

    return (
        <group>
            <TorusKnot ref={meshRef} args={[1, 0.3, 128, 64]} castShadow receiveShadow>
                <MeshDistortMaterial
                    color="#4c1d95"
                    emissive="#ff0066"
                    emissiveIntensity={0.2}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.4}
                    speed={2}
                />
            </TorusKnot>
        </group>
    );
};

const Experience = () => {
    const [activeId, setActiveId] = useState(null);

    return (
        <>
            <SoftShadows size={10} samples={16} focus={0.5} />

            {/* Lighting - Brightened for better image visibility */}
            <ambientLight intensity={0.8} />
            <SpotLight
                position={[10, 20, 10]}
                angle={0.3}
                penumbra={1}
                intensity={2.5}
                castShadow
                shadow-mapSize={[1024, 1024]}
                color="#ffccdd"
            />
            <pointLight position={[-10, -5, -10]} intensity={1.5} color="#4c1d95" />

            {/* Main Object - Hides when active */}
            <AbstractCenterpiece active={activeId !== null} />

            {/* Click Background to Close */}
            <mesh
                position={[0, 0, -1]}
                onClick={() => setActiveId(null)}
                visible={false}
            >
                <planeGeometry args={[100, 100]} />
            </mesh>

            {/* Text Panel (Only visible when active) */}
            {activeId !== null && (
                <Html position={[2, 0, 5]} center transform sprite zIndexRange={[100, 0]}>
                    <div className="w-[350px] p-8 text-white bg-black/80 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl font-serif">
                        <h3 className="text-3xl mb-4 text-pink-300">Nuestra Historia</h3>
                        <p className="text-lg leading-relaxed text-gray-200">
                            Cada foto captura un instante de eternidad contigo.
                            Eres mi lugar seguro y mi aventura favorita.
                        </p>
                        <p className="mt-6 text-sm text-gray-400 italic">
                            Click en el fondo para volver.
                        </p>
                    </div>
                </Html>
            )}

            {/* Static Gallery */}
            <group position={[0, 0, 0]}>
                {IMAGES.slice(0, 12).map((url, i) => {
                    const pos = getGridPosition(i);
                    return (
                        <FloatingImage
                            key={i}
                            index={i}
                            url={url}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            homePosition={pos}
                            homeRotation={[0, 0, 0]}
                            homeScale={[1.8, 2.4]}  // 3:4 Portrait Ratio
                        />
                    );
                })}
            </group>
        </>
    );
};

export default Experience;
