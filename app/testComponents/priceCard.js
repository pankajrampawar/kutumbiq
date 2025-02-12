import { motion } from 'framer-motion';
import { useState } from 'react';

export const PriceCard = ({ price }) => {
    const discountedPrice = price * 0.75;
    const finalPrice = Math.ceil(discountedPrice)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-sm rounded-lg"
        >

            <div className="flex items-baseline gap-3">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex items-baseline gap-2"
                >
                    <span className="text-lg font-bold  text-textAlt">
                        ₹{finalPrice}
                    </span>
                    <span className="text-xs text-gray-400 line-through ">
                        ₹{price}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Demo component to show usage
export default function Demo() {
    const [inputPrice, setInputPrice] = useState(1000);

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-md mx-auto mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Original Price:
                </label>
                <input
                    type="number"
                    value={inputPrice}
                    onChange={(e) => setInputPrice(Number(e.target.value))}
                    className="p-2 border rounded-md w-full"
                />
            </div>

            <PriceCard price={inputPrice} />
        </div>
    );
}