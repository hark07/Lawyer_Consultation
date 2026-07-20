import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Legal Consult
            </h2>

            <p className="text-sm leading-6">
              Professional online legal consultation platform connecting clients
              with experienced lawyers anytime, anywhere.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Lawyers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Appointments
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Legal Services
            </h3>

            <ul className="space-y-2">
              <li>Civil Law</li>
              <li>Criminal Law</li>
              <li>Family Law</li>
              <li>Corporate Law</li>
              <li>Property Law</li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone />
                <span>+977 9800000000</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope />
                <span>support@legalconsult.com</span>
              </div>
            </div>

            {/* Social Links */}

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-xl hover:text-white">
                <FaFacebook />
              </a>

              <a href="#" className="text-xl hover:text-white">
                <FaTwitter />
              </a>

              <a href="#" className="text-xl hover:text-white">
                <FaLinkedin />
              </a>

              <a href="#" className="text-xl hover:text-white">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Legal Consult. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
