import {
  FaArrowRight,
  FaBalanceScale,
  FaCheckCircle,
  FaCalendarCheck,
  FaUserTie,
} from "react-icons/fa";

import image from "../assets/image.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-h-[650px] items-center lg:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-20 py-16 lg:py-24">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <FaBalanceScale className="text-blue-600" />
              Trusted Legal Professionals
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[64px]">
              Find the Right
              <span className="block text-blue-600">
                Lawyer for Your Case
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Connect with experienced and trusted lawyers who understand
              your needs. Get professional legal guidance and the support
              you need to move forward with confidence.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
              >
                Find a Lawyer
                <FaArrowRight className="text-sm" />
              </button>

              <button
                type="button"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                How It Works
              </button>
            </div>

            {/* Trust Items */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCheckCircle className="text-green-500" />
                Verified Lawyers
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCheckCircle className="text-green-500" />
                Secure Consultation
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCheckCircle className="text-green-500" />
                Easy Booking
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex min-h-[600px] items-end justify-center lg:justify-end">

            {/* Background Circle */}
            <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-50" />

            {/* Bottom Shape */}
            <div className="absolute bottom-0 right-10 h-[420px] w-[420px] rounded-t-full bg-blue-100/60" />

            {/* Lawyer Image */}
            <div className="relative z-10 flex items-end justify-center">
              <img
                src={image}
                alt="Professional lawyer"
                width={413}
                height={604}
                className="h-auto w-[320px] object-contain sm:w-[360px] lg:w-[413px]"
              />
            </div>

            {/* ================= VERIFIED CARD ================= */}
            <div className="absolute left-0 top-24 z-20 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_15px_40px_rgba(15,23,42,0.12)] sm:left-4 lg:left-0">
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                  <FaCheckCircle className="text-xl text-green-500" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Verified Lawyers
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Trusted professionals
                  </p>
                </div>

              </div>
            </div>

            {/* ================= CONSULTATION CARD ================= */}
            <div className="absolute bottom-24 right-0 z-20 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_15px_40px_rgba(15,23,42,0.12)] sm:right-4 lg:right-0">
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <FaCalendarCheck className="text-xl text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Easy Consultation
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Book online with ease
                  </p>
                </div>

              </div>
            </div>

            {/* ================= LAWYER CARD ================= */}
            <div className="absolute bottom-5 left-0 z-20 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.12)] sm:block lg:left-[-20px]">
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50">
                  <FaUserTie className="text-lg text-indigo-600" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Experienced Lawyers
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Ready to help you
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;