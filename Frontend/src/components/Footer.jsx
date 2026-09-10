import {
  FaBalanceScale,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* ================= MAIN FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <FaBalanceScale className="text-lg" />
              </div>

              <span className="text-xl font-bold">
                Legal<span className="text-blue-500">Connect</span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Connect with trusted and experienced lawyers who are ready to help
              you with your legal needs.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a href="/" className="text-sm transition hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Find a Lawyer
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  How It Works
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* ================= PRACTICE AREAS ================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Practice Areas
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Family Law
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Criminal Law
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Business Law
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Real Estate Law
                </a>
              </li>

              <li>
                <a href="" className="text-sm transition hover:text-blue-400">
                  Immigration Law
                </a>
              </li>
            </ul>
          </div>

          {/* ================= FOR LAWYERS ================= */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Lawyers
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Join our network of trusted legal professionals and connect with
              clients looking for legal help.
            </p>

            <a
              href="/login"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Join as a Lawyer
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} LegalConnect. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <a href="" className="transition hover:text-white">
              Privacy Policy
            </a>

            <a href="" className="transition hover:text-white">
              Terms of Service
            </a>

            <a href="" className="transition hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
