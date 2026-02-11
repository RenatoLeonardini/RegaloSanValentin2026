import React from 'react';
import { motion } from 'framer-motion';

const FloatingPhoto = ({ src, alt, x, y, rotate, delay, scale = 1, zIndex = 1 }) => {
    return (
        <motion.div
            className="absolute p-2 bg-white shadow-xl rounded-sm pointer-events-auto"
            style={{
                left: x,
                top: y,
                rotate: rotate,
                zIndex: zIndex,
                width: '120px', // Mobile optimized size
                transformOrigin: 'center center',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: scale,
                y: [0, -15, 0], // Floating effect
            }}
            transition={{
                opacity: { duration: 1, delay: delay },
                scale: { duration: 1, delay: delay },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: delay, // Async floating
                },
            }}
            whileTap={{ scale: 1.5, zIndex: 50, rotate: 0 }}
        >
            <div className="w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-2">
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
            <div className="h-4"></div> {/* Bottom space of polaroid */}
        </motion.div>
    );
};

export default FloatingPhoto;
