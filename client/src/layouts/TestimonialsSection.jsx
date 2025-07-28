import React from 'react';

const testimonials = [
    {
        quote: "TaskForge keeps my projects so organized — I save hours every week!",
        name: "Priya R.",
        role: "Product Designer, Creatix",
        avatar: "https://i.pravatar.cc/50?img=1"
    },
    {
        quote: "Love the clean UI. Fast and flexible, even for big teams.",
        name: "Arjun K.",
        role: "Startup Founder",
        avatar: "https://i.pravatar.cc/50?img=2"
    },
    {
        quote: "The open source part convinced me — we added our own custom feature!",
        name: "Rahul S.",
        role: "Frontend Developer",
        avatar: "https://i.pravatar.cc/50?img=3"
    },
    {
        quote: "Finally, a tool that's actually lightweight but powerful.",
        name: "Sara P.",
        role: "Freelance Developer",
        avatar: "https://i.pravatar.cc/50?img=4"
    },
    {
        quote: "Our small agency now tracks all client work in one place.",
        name: "Ravi T.",
        role: "Project Manager",
        avatar: "https://i.pravatar.cc/50?img=5"
    },
    {
        quote: "Smooth integration with GitHub saves so much context switching.",
        name: "Neha M.",
        role: "Software Engineer",
        avatar: "https://i.pravatar.cc/50?img=6"
    },
    {
        quote: "TaskForge is perfect for solo makers — simple but scalable.",
        name: "Kabir D.",
        role: "Indie Hacker",
        avatar: "https://i.pravatar.cc/50?img=7"
    },
    {
        quote: "Easy to onboard new teammates, and the roadmap looks great!",
        name: "Ishita V.",
        role: "Team Lead",
        avatar: "https://i.pravatar.cc/50?img=8"
    }
];

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
