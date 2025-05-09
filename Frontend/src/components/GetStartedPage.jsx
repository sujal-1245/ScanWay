import React, { useState } from "react";
import { motion } from "framer-motion";

const GetStartedPage = () => {
  const [formData, setFormData] = useState({
    Rutting: "",
    Fatigue_Cracking: "",
    Block_Cracking: "",
    Longitudinal_Cracking: "",
    Transverse_Cracking: "",
    Patching: "",
    Potholes: "",
    Delamination: "",
    Traffic_Volume: "",
    Temperature_C: "",
    Precipitation_mm: "",
    Severity_Rating: "",
    Maintenance_History: "",
    model: "catboost",
  });

  const [predictions, setPredictions] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to fetch predictions");

      const data = await response.json();
      setImageUrl(`data:image/png;base64,${data.image_base64}`);
      setPredictions(data.predictions);
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] mt-10 min-h-screen text-white py-10 px-4 sm:px-10 lg:px-20 font-sans">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-white"
      >
        🚧 Prediction of Pavement Condition Index (%)
      </motion.h1>

      <motion.div
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-white bg-opacity-10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 max-w-3xl mx-auto mb-16 border border-blue-500/20"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ["Rutting", "Rutting (mm)"],
            ["Fatigue_Cracking", "Fatigue Cracking (m²)"],
            ["Block_Cracking", "Block Cracking (m²)"],
            ["Longitudinal_Cracking", "Longitudinal Cracking (m²)"],
            ["Transverse_Cracking", "Transverse Cracking (m²)"],
            ["Patching", "Patching (m²)"],
            ["Potholes", "Potholes (Number)"],
            ["Delamination", "Delamination (m²)"],
            ["Traffic_Volume", "Traffic Volume (vehicles/day)"],
            ["Temperature_C", "Temperature (°C)"],
            ["Precipitation_mm", "Precipitation (mm)"],
          ].map(([name, placeholder]) => (
            <motion.input
              key={name}
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              whileFocus={{ scale: 1.03 }}
              whileHover={{ scale: 1.03 }}
              className="p-4 border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-xl bg-[#1c1c1c] text-white shadow-md transition-all duration-200"
            />
          ))}

          <select
            name="Severity_Rating"
            value={formData.Severity_Rating}
            onChange={handleChange}
            className="p-4 border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-xl bg-[#1c1c1c] text-white shadow-md transition-all duration-200"
          >
            <option value="" disabled>Severity Rating</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="Maintenance_History"
            value={formData.Maintenance_History}
            onChange={handleChange}
            className="p-4 border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-xl bg-[#1c1c1c] text-white shadow-md transition-all duration-200"
          >
            <option value="" disabled>Maintenance History</option>
            <option value="Major repairs">Major repairs</option>
            <option value="Minor repairs">Minor repairs</option>
            <option value="None">None</option>
          </select>

          <select
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="p-4 border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-xl bg-[#1c1c1c] text-white shadow-md transition-all duration-200"
          >
            <option value="catboost">CatBoost</option>
            <option value="random_forest">Random Forest</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="sm:col-span-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Submit
          </motion.button>
        </form>
      </motion.div>

      {loading && <p className="text-center text-gray-300">⏳ Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {predictions && (
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#1a1a1a] bg-opacity-60 backdrop-blur-xl rounded-3xl p-6 max-w-6xl mx-auto mb-10 shadow-xl border border-blue-500/30"
        >
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">
            📊 PCI Predictions (%)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(predictions).map(([modelName, value], idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(0, 132, 255, 0.6)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#222] rounded-xl p-4 shadow-lg border border-gray-700"
              >
                <h3 className="text-md font-semibold text-blue-400 mb-2">{modelName}</h3>
                <p className="text-white text-xl font-bold">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {imageUrl && (
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-[#1a1a1a] rounded-xl p-6 max-w-4xl mx-auto text-center shadow-lg border border-blue-500/20"
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">
            📈 Predicted PCI – Model Comparison Chart
          </h2>
          <div className="overflow-hidden rounded-lg mb-4">
            <img
              src={imageUrl}
              alt="Prediction Graph"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-gray-400 text-sm">
            This chart compares PCI (%) predictions between different models based on your inputs.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GetStartedPage;
