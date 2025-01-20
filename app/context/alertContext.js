'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// Alert Context
const AlertContext = createContext({
    alerts: [],
    addAlert: () => { },
    removeAlert: () => { },
});

// Alert Provider Component
export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = useCallback((message, type = 'default', duration = 5000) => {
        const id = Math.random().toString(36).substring(7);
        setAlerts((prev) => [...prev, { id, message, type }]);

        if (duration) {
            setTimeout(() => removeAlert(id), duration);
        }
    }, []);

    const removeAlert = useCallback((id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
            <AlertContainer />
        </AlertContext.Provider>
    );
};

// Hook to use alerts
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

// Alert Container Component
const AlertContainer = () => {
    const { alerts, removeAlert } = useAlert();

    return (
        <div className="fixed max-w-[400px] bottom-4 left-0 right-0 mx-auto sm:right-4 sm:left-auto z-50 flex flex-col gap-2">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <Alert key={alert.id} alert={alert} onClose={() => removeAlert(alert.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Individual Alert Component
const Alert = ({ alert, onClose }) => {
    const variants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 text-green-800 border-green-200';
            case 'error':
                return 'bg-red-50 text-red-800 border-red-200';
            case 'warning':
                return 'bg-yellow-50 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-50 text-gray-800 border-gray-200';
        }
    };

    return (

        <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-full rounded-lg border p-4 shadow-lg ${getAlertStyle(alert.type)}`}
        >
            <div className="flex items-start gap-2">
                <p className="flex-1 text-sm font-medium">{alert.message}</p>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default Alert;