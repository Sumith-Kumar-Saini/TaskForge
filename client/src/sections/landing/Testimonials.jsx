import testimonials from '@/data/landing/testimonials';
import React from 'react';

export default function TestimonialsSection() {
    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Real stories from early adopters and growing teams.
                </p>
            </div>

            <div className="space-y-8 max-w-6xl mx-auto">
                {/* Row 1: 3 cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {testimonials.slice(0, 3).map((t, index) => (
                        <div key={index} className="flex-1 min-w-[220px] max-w-[300px] border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-4xl mb-3 text-gray-400">❝</div>
                            <p className="text-gray-800 text-sm mb-4">{t.quote}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-left">
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-gray-600 text-xs">{t.role}</div>
                                </div>
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 2: 2 cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {testimonials.slice(3, 5).map((t, index) => (
                        <div key={index} className="flex-1 min-w-[220px] max-w-[300px] border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-4xl mb-3 text-gray-400">❝</div>
                            <p className="text-gray-800 text-sm mb-4">{t.quote}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-left">
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-gray-600 text-xs">{t.role}</div>
                                </div>
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Row 3: 3 cards */}
                <div className="flex flex-wrap justify-center gap-6">
                    {testimonials.slice(5, 8).map((t, index) => (
                        <div key={index} className="flex-1 min-w-[220px] max-w-[300px] border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-4xl mb-3 text-gray-400">❝</div>
                            <p className="text-gray-800 text-sm mb-4">{t.quote}</p>
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-left">
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-gray-600 text-xs">{t.role}</div>
                                </div>
                                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
