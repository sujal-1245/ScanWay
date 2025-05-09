import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/pavement_img-1.jpg")' }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Enhancing Roads for a Better Future
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Accurately assess and predict pavement conditions with ease.
            Optimize maintenance, save costs, and ensure safer roads with our PCI prediction model.
          </p>
          <Link to="/get-started">
            <button className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white font-semibold rounded-lg shadow-md">
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl w-full"
        >
          {[
            {
              title: 'Cost-Effective Maintenance',
              desc: 'Predicting deterioration enables timely maintenance, lowering repair expenses and preventing costly overhauls.',
              img: '/images/pavement_img-1.jpg',
            },
            {
              title: 'Improved Road Safety',
              desc: 'Timely interventions based on predictions ensure safer driving conditions by minimizing hazardous road conditions.',
              img: '/images/pavement_img-2.jpeg',
            },
            {
              title: 'Sustainable Infrastructure',
              desc: 'Accurate deterioration models support long-term planning, extending pavement lifespan and reducing environmental impact.',
              img: '/images/pavement_img-3.jpeg',
            },
          ].map((card, i) => (
            <div
  key={i}
  className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-xl text-black shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
>
  <img
    src={card.img}
    alt={card.title}
    className="h-40 w-full object-cover rounded-lg mb-4 shadow-md"
  />
  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
  <p className="text-sm text-gray-700">{card.desc}</p>
</div>

          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
