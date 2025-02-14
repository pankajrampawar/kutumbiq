import React, { useEffect, useState } from 'react';
import { PlusCircle, Save, Trash2, Edit2 } from 'lucide-react';

function UpdateVendorHolder({ vendorsParam }) {
    const [vendors, setVendors] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedVendors, setEditedVendors] = useState(vendors);

    useEffect(() => {
        setVendors(vendorsParam);
        setEditedVendors(vendorsParam);
    }, [])


    const handleVendorChange = (vendorId, field, value) => {
        setEditedVendors(prevVendors =>
            prevVendors.map(vendor =>
                vendor._id === vendorId ? { ...vendor, [field]: value } : vendor
            )
        );
    };

    const handleMenuItemChange = (vendorId, menuIndex, field, value) => {
        setEditedVendors(prevVendors =>
            prevVendors.map(vendor => {
                if (vendor._id === vendorId) {
                    const updatedMenu = [...vendor.menu];
                    updatedMenu[menuIndex] = { ...updatedMenu[menuIndex], [field]: value };
                    return { ...vendor, menu: updatedMenu };
                }
                return vendor;
            })
        );
    };

    const handleAddMenuItem = (vendorId) => {
        setEditedVendors(prevVendors =>
            prevVendors.map(vendor => {
                if (vendor._id === vendorId) {
                    return {
                        ...vendor,
                        menu: [...vendor.menu, {
                            name: '',
                            price: 0,
                            tags: [],
                            image: '',
                            description: ''
                        }]
                    };
                }
                return vendor;
            })
        );
    };

    const handleDeleteMenuItem = (vendorId, menuIndex) => {
        setEditedVendors(prevVendors =>
            prevVendors.map(vendor => {
                if (vendor._id === vendorId) {
                    const updatedMenu = vendor.menu.filter((_, index) => index !== menuIndex);
                    return { ...vendor, menu: updatedMenu };
                }
                return vendor;
            })
        );
    };

    const handleSaveChanges = () => {
        setVendors(editedVendors);
        setEditMode(false);
        // Here you would typically make an API call to save the changes
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Update Vendor</h1>
                    {editMode ? (
                        <button
                            onClick={handleSaveChanges}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Save size={20} />
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit2 size={20} />
                            Edit
                        </button>
                    )}
                </div>

                {editedVendors.map((vendor) => (
                    <div key={vendor._id} className="bg-slate-200 rounded-lg shadow-md p-6 mb-6">
                        <div className="grid grid-cols-2 gap-6 mb-6 bg-rustOrange/20 p-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
                                    <input
                                        type="text"
                                        value={vendor.name}
                                        onChange={(e) => handleVendorChange(vendor._id, 'name', e.target.value)}
                                        disabled={!editMode}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={vendor.description}
                                        onChange={(e) => handleVendorChange(vendor._id, 'description', e.target.value)}
                                        disabled={!editMode}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
                                    <input
                                        type="text"
                                        value={vendor.deliveryTime}
                                        onChange={(e) => handleVendorChange(vendor._id, 'deliveryTime', e.target.value)}
                                        disabled={!editMode}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                                    <input
                                        type="number"
                                        value={vendor.rating}
                                        onChange={(e) => handleVendorChange(vendor._id, 'rating', parseFloat(e.target.value))}
                                        disabled={!editMode}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Average Price</label>
                                    <input
                                        type="number"
                                        value={vendor.avgPrice}
                                        onChange={(e) => handleVendorChange(vendor._id, 'avgPrice', parseFloat(e.target.value))}
                                        disabled={!editMode}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pure Veg</label>
                                    <input
                                        type="checkbox"
                                        checked={vendor.isPureVeg}
                                        onChange={(e) => handleVendorChange(vendor._id, 'isPureVeg', e.target.checked)}
                                        disabled={!editMode}
                                        className="mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Menu Items</h3>
                                {editMode && (
                                    <button
                                        onClick={() => handleAddMenuItem(vendor._id)}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <PlusCircle size={20} />
                                        Add Item
                                    </button>
                                )}
                            </div>

                            <div className="grid gap-6">
                                {vendor.menu.map((item, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                                        {editMode && (
                                            <button
                                                onClick={() => handleDeleteMenuItem(vendor._id, index)}
                                                className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => handleMenuItemChange(vendor._id, index, 'name', e.target.value)}
                                                    disabled={!editMode}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => handleMenuItemChange(vendor._id, index, 'price', parseFloat(e.target.value))}
                                                    disabled={!editMode}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => handleMenuItemChange(vendor._id, index, 'description', e.target.value)}
                                                    disabled={!editMode}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                                <input
                                                    type="text"
                                                    value={item.image}
                                                    onChange={(e) => handleMenuItemChange(vendor._id, index, 'image', e.target.value)}
                                                    disabled={!editMode}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                                                <input
                                                    type="text"
                                                    value={item.tags?.join(', ')}
                                                    onChange={(e) => handleMenuItemChange(vendor._id, index, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
                                                    disabled={!editMode}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UpdateVendorHolder;