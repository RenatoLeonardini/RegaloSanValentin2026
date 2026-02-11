import React from 'react';
import { motion } from 'framer-motion';

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

const PhotoGallery = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
                {/* Text Block (Spans 2 columns) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="col-span-2 row-span-1 bg-pink-100/90 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col justify-center border border-pink-200"
                >
                    <h3 className="text-2xl font-serif text-pink-600 mb-2">Lorem Ipsum</h3>
                    <p className="text-gray-700 font-light text-sm md:text-base leading-relaxed">
                        Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                </motion.div>

                {/* Images */}
                {IMAGES.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={src}
                            alt={`Memoria ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
