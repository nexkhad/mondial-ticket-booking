"use client"

const Newsletter = () => {
    return (
      <section className="bg-blue-800 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white mb-8">Get the latest offers and travel tips delivered to your inbox</p>
          <form className="flex flex-col md:flex-row justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md w-full md:w-auto mb-4 md:mb-0"
            />
            <button
              type="submit"
              className="bg-white text-blue-800 px-6 py-2 rounded-r-md font-semibold hover:bg-blue-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Newsletter;