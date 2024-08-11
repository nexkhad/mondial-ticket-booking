"use client"

import Image from "next/image";

const SpecialOffers = () => {
    const offers = [
      { title: "Summer Sale", description: "Get 20% off on all flights to Europe", image: "https://placehold.co/900x1200", alt: "European landmarks collage" },
      { title: "Business Class Upgrade", description: "Upgrade to Business Class for only $199", image: "https://placehold.co/900x1200", alt: "Business class cabin" },
    ];
  
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <div key={offer.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image src={offer.image} alt={offer.alt} width={600} height={300} objectFit="cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600">{offer.description}</p>
                  <button className="mt-4 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default SpecialOffers;