import React from "react";
import { Link } from "react-router-dom";
import "./fonts.css";
import gearbox from "../assets/gearbox.png";
const Footer = () => {
  return (
    <footer className="mt-28 w-full bg-white/10 backdrop-blur-sm px-6 py-10 text-white">
      <img className="w-48 h-25" src={gearbox} alt="" />
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#df1b1b] font-[montserrat]">
            Quick Links
          </h2>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <a href="#">Browse Equipment</a>
            </li>
            <li>
              <Link to="/sellersignup">Become a Seller </Link>
            </li>
            <li>
              <a href="#">Community Guidelines</a>
            </li>
            <li>
              <Link to="/ReturnPolicy">Return & Caution Depoit</Link>
            </li>
          </ul>
        </div>

        {/* Services & Social */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-[#df1b1b] font-[montserrat]">
            Services
          </h2>
          <ul className="text-sm space-y-1 mb-4 ">
            <li className="hover:text-[#df1b1b]">
              <a href="#">Rent Equipment</a>
            </li>
            <li className="hover:text-[#df1b1b]">
              <a href="#">List Your Gear</a>
            </li>
            <li>
              <a href="#">Admin Support</a>
            </li>
            <li>
              <a href="#">Safe Transactions</a>
            </li>
            <li>
              <a href="#">Customer Support</a>
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-2 text-[#df1b1b] font-[montserrat]">
            Follow Us
          </h2>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">YouTube</a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold  mb-2 text-[#df1b1b] font-[montserrat]">
            Contact Gear box
          </h2>
          <form
            action="https://formspree.io/f/xpwrzryy"
            method="POST"
            className="flex flex-col space-y-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="px-3 py-2 rounded text-black bg-white/20 placeholder:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="px-3 py-2 rounded text-black bg-white/20 placeholder:text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              required
              className="px-3 py-2 rounded text-black bg-white/20 placeholder:text-white"
            ></textarea>
            <button
              type="submit"
              className="bg-[#df1b1b] text-white px-3 py-2 rounded hover:bg-[#df1b11]"
            >
              Send
            </button>
          </form>
        </div>

        {/* Legal & Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Legal</h2>
          <ul className="text-sm space-y-1 mb-4">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Refund Policy</a>
            </li>
            <li>
              <a href="#">Cookie Policy</a>
            </li>
          </ul>
          <p className="text-sm mb-2">Email: support@gearbox.com</p>
          <p className="text-sm">Phone: +1 (800) 123-4567</p>
          <p className="text-sm">Address: Gearbox HQ, [Insert Address Here]</p>
        </div>
      </div>

      <div className="mt-10 text-center text-xs border-t border-white/20 pt-4">
        <p>© 2025 Gearbox. All rights reserved.</p>
        <p>
          Gearbox is a registered trademark. All equipment rental transactions
          are subject to the terms and conditions of use.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
