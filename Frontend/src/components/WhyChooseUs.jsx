import {
  FaCheckCircle,
  FaShieldAlt,
  FaCalendarCheck,
  FaUserTie,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaCheckCircle,
      title: "Verified Lawyers",
      description:
        "Connect with trusted legal professionals whose profiles and credentials are carefully reviewed.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Private",
      description:
        "Your information and consultation details are handled with privacy and security in mind.",
    },
    {
      icon: FaCalendarCheck,
      title: "Easy Online Booking",
      description:
        "Book a consultation at a time that works for you without unnecessary hassle.",
    },
    {
      icon: FaUserTie,
      title: "Experienced Professionals",
      description:
        "Find lawyers with the right experience and expertise for your specific legal needs.",
    },
    {
      icon: FaHeadset,
      title: "Reliable Support",
      description:
        "Get helpful support throughout your journey to make connecting with a lawyer easier.",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Why LegalConnect
            </span>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Legal help you can trust,{" "}
              <span className="text-blue-600">when you need it.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              We make it easier to connect with qualified lawyers and get
              professional legal guidance without making the process
              complicated.
            </p>

            {/* Feature List */}
            <div className="mt-9 space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="text-lg" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-50" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-indigo-50" />

            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-2xl sm:p-10">
              {/* Decorative Shape */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
              <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-600/10" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <FaShieldAlt className="text-2xl" />
                </div>

                <h3 className="mt-7 text-2xl font-bold text-white sm:text-3xl">
                  Your legal journey starts with the right professional.
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  Whether you need help with family matters, business, property,
                  criminal law, or another legal issue, find professionals ready
                  to help.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Secure Platform
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="mt-1 text-sm text-slate-400">Easy Access</p>
                  </div>
                </div>

                <a
                  href="/lawyers"
                  className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
                >
                  Explore Lawyers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
