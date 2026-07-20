import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="shadow-lg p-6 rounded-xl">
              <h3 className="font-bold text-xl">Verified Lawyers</h3>

              <p className="mt-3 text-gray-600">Trusted legal professionals.</p>
            </div>

            <div className="shadow-lg p-6 rounded-xl">
              <h3 className="font-bold text-xl">Online Consultation</h3>

              <p className="mt-3 text-gray-600">Meet lawyers from anywhere.</p>
            </div>

            <div className="shadow-lg p-6 rounded-xl">
              <h3 className="font-bold text-xl">Secure Payments</h3>

              <p className="mt-3 text-gray-600">Safe and protected booking.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
