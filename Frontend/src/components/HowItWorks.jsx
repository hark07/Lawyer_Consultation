import {
  FaSearch,
  FaUserTie,
  FaCalendarCheck,
  FaArrowRight,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: FaSearch,
      title: "Find a Lawyer",
      description:
        "Browse verified lawyers by practice area, experience, and expertise to find the right legal professional for your needs.",
    },
    {
      number: "02",
      icon: FaUserTie,
      title: "View Profile",
      description:
        "Check the lawyer's profile, qualifications, experience, practice areas, and consultation details before making a decision.",
    },
    {
      number: "03",
      icon: FaCalendarCheck,
      title: "Book Consultation",
      description:
        "Choose a convenient time and book your legal consultation online quickly and securely.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Simple & Easy
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Finding the right legal professional has never been easier.
            Get started in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting Line */}
          <div className="absolute left-[20%] right-[20%] top-16 hidden h-px bg-blue-100 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative z-10 text-center">
                {/* Icon */}
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-white bg-blue-50 shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Icon className="text-2xl" />
                  </div>

                  <span className="absolute -right-1 top-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-7 px-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link */}
        <div className="mt-12 text-center">
          <a
            href="/lawyers"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Start finding a lawyer
            <FaArrowRight className="text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;