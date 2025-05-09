import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";
import AboutUs from "./components/AboutUs";
import AboutSection from "./components/AboutSection";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GetStartedPage from "./components/GetStartedPage";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import "./index.css"; // Tailwind base styles

function App() {
  return (
    <Router>
      <div className="bg-[#0f0f0f] text-white font-sans min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Hero />

                  <motion.div
                    className="space-y-12 mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                  >
                    <Element name="about-us">
                      <motion.section
                        id="about-us"
                        className="py-20 px-4 sm:px-8 md:px-16 bg-[#111] rounded-3xl shadow-xl backdrop-blur-md"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="space-y-8">
                          <AboutSection />
                        </div>
                      </motion.section>
                    </Element>

                    <Element name="faq">
                      <motion.section
                        id="faq"
                        className="py-20 px-4 sm:px-8 md:px-16 bg-[#121212] rounded-3xl shadow-xl backdrop-blur-md"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                      >
                        <div className="space-y-8">
                          <FAQ />
                        </div>
                      </motion.section>
                    </Element>
                  </motion.div>
                </motion.div>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/get-started" element={<GetStartedPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
