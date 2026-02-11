import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

const FloatingImage = ({
    url,
    index,
    activeId,
    setActiveId,
    homePosition,
    homeRotation = [0, 0, 0],
    homeScale = [1.8, 2.4], // 3:4 Portrait Ratio (Standard Phone Photo)
    ...props
}) => {
    const ref = useRef();
    const [hovered, hover] = useState(false);

    // Is this specific image active?
    const isActive = activeId === index;
    // Is ANY image active?
    const isAnyActive = activeId !== null;

    useFrame((state, delta) => {
        if (!ref.current) return;

        // TARGET OFFSETS
        let targetPos = homePosition;
        let targetRot = homeRotation;
        let targetScale = homeScale;
        let targetOpacity = 1;
        let targetGrayscale = 0;

        if (isActive) {
            // FOCUSED STATE (Left side, big)
            // Maintaining the same 3:4 Aspect Ratio, just larger
            targetPos = [-4.5, 0, 6];
            targetRot = [0, 0, 0];
            targetScale = [4.5, 6]; // 3:4 Ratio scaled up
        } else if (isAnyActive) {
            // BACKGROUND STATE (Dimmed but visible)
            // Push back slightly to emphasize depth
            targetPos = [homePosition[0], homePosition[1], homePosition[2] - 2];
            targetScale = homeScale;
            targetOpacity = 0.3; // Visible but dim
            targetGrayscale = 0.8; // De-saturate background
        } else {
            // IDLE STATE (Home)
            if (hovered) {
                targetScale = [homeScale[0] * 1.05, homeScale[1] * 1.05, 1];
            }
        }

        // Smoothly animate
        easing.damp3(ref.current.position, targetPos, 0.4, delta);
        easing.damp3(ref.current.rotation, targetRot, 0.4, delta);
        easing.damp3(ref.current.scale, targetScale, 0.4, delta);
        easing.damp(ref.current.material, 'opacity', targetOpacity, 0.4, delta);
        easing.damp(ref.current.material, 'grayscale', targetGrayscale, 0.4, delta);
        easing.damp(ref.current.material, 'zoom', 1, 0.4, delta); // Ensure no internal zooming/cropping
    });

    return (
        <group
            onClick={(e) => {
                e.stopPropagation();
                setActiveId(isActive ? null : index);
            }}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
        >
            <Image
                ref={ref}
                url={url}
                transparent
                side={THREE.DoubleSide}
                toneMapped={false} // CRITICAL: Prevents color washing
                {...props}
            />
        </group>
    );
};

export default FloatingImage;
