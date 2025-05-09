import React, { useState } from 'react';
import './FAQ.css';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a wide range of services including road development, consulting, and prediction of pavement.',
    },
    {
      question: 'How can I sign up?',
      answer: 'You can sign up by clicking on the "Sign Up" button at the top of the page and following the instructions.',
    },
    {
      question: 'Do you provide customer support?',
      answer: 'Yes, we have 24/7 customer support available to help you with any queries or issues you may have.',
    },
  ];

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleQuestion(index)}>
              <h3>{faq.question}</h3>
              <FaChevronDown className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`} />
            </div>
            {activeIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
