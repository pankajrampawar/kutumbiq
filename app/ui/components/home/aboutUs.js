import React from 'react';
import { Heart, Home, Users, Utensils } from 'lucide-react';

function AboutUs() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
                <div className="flex flex-col space-y-12">
                    {/* Header Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            About Us
                        </h2>
                        <div className="mt-4 h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At <span className="text-indigo-600 font-semibold">Kutumbiq</span>, we believe that students deserve a fresh start, free from the stress of navigating
                            the challenges of a new city. Moving away from home is tough, and we've been there
                            ourselves—struggling with rude brokers, searching endlessly for affordable furniture, eating
                            unhealthy meals, and trying to maintain a clean home amidst a busy schedule.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-indigo-100 rounded-lg">
                                    <Home className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Live Fearlessly</h3>
                            </div>
                            <p className="text-gray-600">Connect with like-minded peers and make lifelong memories in a safe, welcoming environment.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-indigo-100 rounded-lg">
                                    <Utensils className="w-6 h-6 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Eat Healthily</h3>
                            </div>
                            <p className="text-gray-600">Enjoy nutritious, home-style meals that keep you energized throughout your academic journey.</p>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="bg-white p-8 rounded-xl shadow-md mt-8">
                        <div className="flex items-left justify-center space-x-4 mb-6">
                            <Users className="w-8 h-8 text-indigo-600" />
                            <h3 className="text-2xl font-semibold text-gray-900">Why? Because We Care!</h3>
                        </div>
                        <p className="text-gray-600">
                            From housing to food and beyond, we've got your back. We believe every student deserves to start this journey without the anxiety of being alone.
                        </p>
                    </div>

                    {/* Closing Statement */}
                    <div className="text-center mt-12">
                        <div className="flex items-center justify-center mb-4">
                            <Heart className="w-6 h-6 text-rose-500 mr-2" />
                            <h3 className="text-2xl font-semibold text-gray-900">Your Family Away From Home</h3>
                        </div>
                        <p className="text-lg text-gray-600">
                            Welcome to Kutumbiq—where you're part of something bigger, a community that ensures you never feel out of place.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;