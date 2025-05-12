import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ErrorMetricsChart() {
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/error-chart') // Update URL if hosted elsewhere
      .then(res => {
        if (res.data.chart) {
          setChart(res.data.chart);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching chart:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Model Error Comparison</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : chart ? (
        <img
          src={`data:image/png;base64,${chart}`}
          alt="Error Metrics Chart"
          className="rounded-lg shadow-xl mx-auto w-full max-w-3xl"
        />
      ) : (
        <p>Failed to load chart.</p>
      )}
    </div>
  );
}

export default ErrorMetricsChart;
