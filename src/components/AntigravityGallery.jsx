import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const IMAGES = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg",
    "photo7.jpg",
    "photo9.jpg",
    "photo10.jpg",
    "photo11.jpg",
].map(name => `${import.meta.env.BASE_URL}assets/${name}`);

// Symmetrical Layout Configuration (4-2-4)
const POSITIONS = [
    // Top Row (4 images)
    { top: 17, left: 20 },
    { top: 17, left: 40 },
    { top: 17, left: 60 },
    { top: 17, left: 80 },
    // Middle Row (2 images flanking center)
    { top: 45, left: 15 },
    { top: 45, left: 85 },
    // Bottom Row (4 images)
    { top: 82, left: 20 },
    { top: 82, left: 40 },
    { top: 82, left: 60 },
    { top: 82, left: 80 },
];

const ITEMS = IMAGES.map((src, i) => {
    // Fallback if we have more images than positions
    const pos = POSITIONS[i] || { top: 50, left: 50 };

    return {
        src,
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        scale: 1, // Uniform scale for symmetry
        duration: 3 + Math.random() * 2, // Slight variation in float speed
        delay: Math.random() * 2,
        // parallaxFactor: 20, // Removed as parallax logic is removed
    };
});

const AntigravityGallery = () => {
    const containerRef = useRef(null);
    // const mouseX = useMotionValue(0); // Removed mouse parallax logic
    // const mouseY = useMotionValue(0); // Removed mouse parallax logic

    // const handleMouseMove = (e) => { // Removed mouse parallax logic
    //     const { clientX, clientY } = e;
    //     const { innerWidth, innerHeight } = window;
    //     const x = (clientX / innerWidth - 0.5) * 2;
    //     const y = (clientY / innerHeight - 0.5) * 2;
    //     mouseX.set(x);
    //     mouseY.set(y);
    // };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full overflow-hidden"
        // onMouseMove={handleMouseMove} // Removed mouse parallax logic
        >

            {/* Central Content Container */}
            <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none text-center w-[90%] md:w-[60%] lg:w-[45%]">
                <div
                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-xl"
                >
                    {/* Title */}
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl text-[#E91E63] animate-pulse">
                            ❤️
                        </span>
                        <h1
                            className="text-3xl md:text-5xl font-bold text-[#C2185B] drop-shadow-sm mt-1"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            Te amo mi vida
                        </h1>
                    </div>

                    {/* Poem Section */}
                    <div className="flex flex-col items-center gap-1">
                        <h2
                            className="text-2xl md:text-4xl font-bold text-[#D81B60] drop-shadow-sm"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            El Juramento
                        </h2>
                        <p
                            className="text-lg md:text-2xl font-medium text-[#AD1457] leading-relaxed"
                            style={{ fontFamily: "'Dancing Script', cursive" }}
                        >
                            ¡Oh Cielo! Deseo conocerte y ser tu amor, y que nuestro vínculo jamás disminuya.
                            Solo cuando las montañas no tengan picos, cuando los ríos se agoten, cuando truene en invierno,
                            cuando nieve en verano, y cuando el cielo y la tierra se unan, solo entonces,
                            me atreveré a separarme de ti.
                        </p>
                    </div>

                    {/* Dedication Section */}
                    <div className="mt-1 p-3 bg-white/40 rounded-xl backdrop-blur-md">
                        <p
                            className="text-sm md:text-lg text-[#880E4F] font-semibold leading-tight"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                            "Te dedico este poema mi amor ya que representa el poder del amor que siento por ti, ¿te gustaría ser mi San Valentín? :3"
                        </p>
                    </div>
                </div>
            </div>
            {ITEMS.map((item, index) => (
                <FloatingImage
                    key={index}
                    item={item}
                    index={index}
                />
            ))}
        </div>
    );
};

const FloatingImage = ({ item, index }) => { // Removed mouseX, mouseY from props
    const { src, top, left, scale, duration, delay } = item; // Removed parallaxFactor from item destructuring

    // Removed Smooth Parallax logic
    // const x = useTransform(mouseX, [-1, 1], [-parallaxFactor, parallaxFactor]);
    // const y = useTransform(mouseY, [-1, 1], [-parallaxFactor, parallaxFactor]);
    // const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
    // const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

    return (
        <motion.div
            style={{
                top,
                left,
                // x: smoothX, // Removed mouse parallax logic
                // y: smoothY, // Removed mouse parallax logic
            }}
            className="absolute z-10 w-32 md:w-48 aspect-[3/4] -translate-x-1/2 -translate-y-1/2"
        >
            <motion.div
                animate={{
                    y: [-10, 10, -10],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }}
                className="w-full h-full"
            >
                <div
                    className="w-full h-full p-1 bg-white rounded-[2rem] shadow-xl overflow-hidden transform transition-transform hover:scale-105"
                >
                    <img
                        src={src}
                        alt={`Memory ${index}`}
                        className="w-full h-full object-cover rounded-[1.8rem] pointer-events-none"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AntigravityGallery;

