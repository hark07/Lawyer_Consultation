import { FaArrowRight, FaBalanceScale, FaUserTie } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center shadow-xl sm:px-10 lg:px-16">
          {/* Background Shapes */}
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-indigo-900/20" />

          {/* Decorative Icons */}
          <div className="absolute left-8 top-8 hidden h-14 w-14 rotate-[-12deg] items-center justify-center rounded-2xl bg-white/10 text-white/60 md:flex">
            <FaBalanceScale className="text-xl" />
          </div>

          <div className="absolute bottom-8 right-8 hidden h-14 w-14 rotate-[12deg] items-center justify-center rounded-2xl bg-white/10 text-white/60 md:flex">
            <FaUserTie className="text-xl" />
          </div>

          {/* Content */}
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Get Started Today
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Need Legal Help?
              <span className="block text-blue-100">
                Find the Right Lawyer Today.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Connect with experienced legal professionals and take the
              next step toward solving your legal needs with confidence.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/lawyers"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50"
              >
                Find a Lawyer
                <FaArrowRight className="text-sm" />
              </a>

              <a
                href="/lawyer/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/20"
              >
                Join as a Lawyer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;