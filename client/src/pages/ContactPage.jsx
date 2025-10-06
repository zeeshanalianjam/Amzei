// src/pages/ContactPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaHeadset,
  FaBuilding,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-orange-500 text-xl" />,
    title: "Head Office",
    details: ["Ras AL-khaima marjan"],
  },
 
  {
    icon: <FaPhone className="text-orange-500 text-xl" />,
    title: "Phone Numbers",
    details: [
      "Dubai: 0581867078",
      "Abu Dhabi: 0544003554",
      
    ],
  },
  {
    icon: <FaEnvelope className="text-orange-500 text-xl" />,
    title: "Email Addresses",
    details: [
      "ubaidali052@icloud.com",
      "nangyaluoa249@gmail.com",
      
    ],
  },
  {
    icon: <FaClock className="text-orange-500 text-xl" />,
    title: "Business Hours",
    details: [
      "Monday - Saturday: 9AM - 8PM",
      "Sunday: Closed",
      "Emergency: 24/7 Support",
    ],
  },
];

const faqs = [
  {
    question: "How far in advance should I book my tour?",
    answer:
      "We recommend booking at least 2-3 weeks in advance for domestic tours and 1-2 months for international tours to ensure availability.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer free cancellation up to 48 hours before the tour departure. Cancellations made less than 48 hours in advance may incur a fee.",
  },
  {
    question: "Do you offer customized tours?",
    answer:
      "Yes, we specialize in creating personalized itineraries based on your interests, budget, and schedule. Contact us for a custom tour package.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, bank transfers, and digital payment methods like Apple Pay and Google Pay.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Example API call (replace with your backend)
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulated response
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
            aria-label="Go Back"
            title="Go Back"
            className="flex items-center text-orange-500 font-medium mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="mr-2" /> Back
          </motion.button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need help planning your trip? Our team is ready
              to assist you.
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <FaHeadset className="text-orange-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Get in Touch
                </h2>
              </div>

              <p className="text-gray-600 mb-8">
                Our dedicated team of travel experts is available to assist you
                with any questions about our tours, destinations, or booking
                process. We're committed to providing you with exceptional
                service.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {info.title}
                      </h3>
                      <ul className="text-gray-600 space-y-1">
                        {info.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-gray-600 text-sm">
                  For urgent inquiries, please call our emergency support line
                  available 24/7.
                </p>
                <p className="text-orange-500 font-medium mt-2">0581867078</p>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <FaPaperPlane className="text-orange-500 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Send us a Message
                </h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter your subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                            5.291A7.962 7.962 0 014 12H0c0 
                            3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our tours and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Find Us</h2>
            <p className="text-gray-600">Visit our head office in Dubai</p>
          </div>

          {/* Example Map Embed */}
          <iframe
            src="https://www.google.com/maps?q=Ras+Al+Khaimah+Marjan,+UAE&output=embed"
            className="w-full h-96 border-0"
            allowFullScreen
            loading="lazy"
            title="UAETours Location Map"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
