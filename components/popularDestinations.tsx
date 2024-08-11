"use client"

import Image from "next/image";

const PopularDestinations = () => {
    const destinations = [
      { name: "Paris", image: "https://placehold.co/900x1200", alt: "Eiffel Tower in Paris" },
      { name: "New York", image: "https://placehold.co/900x1200", alt: "New York City skyline" },
      { name: "Tokyo", image: "https://placehold.co/900x1200", alt: "Tokyo cityscape" },
      { name: "Sydney", image: "https://placehold.co/900x1200", alt: "Sydney Opera House" },
    ];
  
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest) => (
              <div key={dest.name} className="relative h-64 rounded-lg overflow-hidden group">
                <Image src={dest.image} alt={dest.alt} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-2xl font-bold">{dest.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PopularDestinations;