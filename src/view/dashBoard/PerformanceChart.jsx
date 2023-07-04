/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./PerformanceChart.css";
import { next, prev } from "../../assets/index";

const PerformanceChart = () => {
  const chartRef = useRef(null);
  Chart.register(ChartDataLabels);

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "May",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleMonths, setVisibleMonths] = useState([]);

  useEffect(() => {
    const startMonth = currentSlide * 6;
    const endMonth = startMonth + 6;
    setVisibleMonths(months.slice(startMonth, endMonth));
  }, [currentSlide]);

  useEffect(() => {
    if (chartRef.current) {
      const chartData = {
        labels: visibleMonths,
        datasets: [
          {
            label: "Evènement",
            backgroundColor: ["rgba(59, 95, 144, 0.1)"],
            borderColor: ["rgba(59, 95, 144, 1)"],
            borderWidth: 2,
            borderRadius: 7,
            data: [200, 100, 100, 100, 100, 200], // Replace with your actual data for the months
            borderSkipped: false,
          },
          {
            label: "Produits",
            backgroundColor: ["rgba(59, 95, 144, 0.1)"],
            borderColor: ["rgba(80, 198, 219, 1)"],
            borderWidth: 2,
            borderRadius: 7,
            data: [70, 70, 70, 70, 70, 100], // Replace with your actual data for the months
            borderSkipped: false,
          },
        ],
      };

      const chartConfig = {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          layout: {
            padding: 8,
          },
          scales: {
            y: {
              beginAtZero: true,
              display: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              align: "end",
              backgroundColor: "#fff",
              borderSkipped: true,
              labels: {
                boxWidth: 20,
                boxHeight: 10,
                color: "#6B778C",
                usePointStyle: true,
                borderRadius: Number.MAX_VALUE,
              },
            },
            datalabels: {
              color: "#6B778C",
              align: "center",
              offset: "10px",
              anchor: "end",
              display: false,
            },
          },
        },
      };

      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }

      const newChart = new Chart(chartRef.current, chartConfig);

      return () => {
        newChart.destroy();
      };
    }
  }, [visibleMonths]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? Math.ceil(months.length / 6) - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === Math.ceil(months.length / 6) - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="performance-chart">
      <canvas ref={chartRef} />
      <div className="slider">
        <img src={prev} onClick={handlePrev} />
        <img src={next} onClick={handleNext} />
      </div>
    </div>
  );
};

export default PerformanceChart;
