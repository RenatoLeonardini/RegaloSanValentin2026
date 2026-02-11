import React from 'react';

const MobileBlocker = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white p-6 text-center md:hidden">
            <div>
                <h2 className="text-2xl font-serif mb-4">Experiencia de Escritorio</h2>
                <p className="text-gray-300">
                    Por favor, abre esto en una computadora (Laptop o PC) para vivir la experiencia completa diseñada para ti.
                </p>
            </div>
        </div>
    );
};

export default MobileBlocker;
