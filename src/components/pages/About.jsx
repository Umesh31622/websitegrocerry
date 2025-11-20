// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./About.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { Line } from "react-chartjs-2";
// import { useNavigate } from "react-router-dom";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const API_BASE = "https://grocerrybackend.vercel.app/api";

// const PriceAnalytics = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const [chartType, setChartType] = useState("daily");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [p, c] = await Promise.all([
//           axios.get(`${API_BASE}/prices`),
//           axios.get(`${API_BASE}/categories`),
//         ]);

//         setProductList(p.data.data || []);
//         setCategoryList(c.data.categories || []);
//       } catch (err) {
//         console.error("Dropdown fetch error:", err);
//       }
//     };

//     fetchDropdowns();
//   }, []);

//   // GROUP HELPERS
//   const groupByWeek = (date) => {
//     const d = new Date(date);
//     const onejan = new Date(d.getFullYear(), 0, 1);
//     const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
//     return `Week ${week} - ${d.getFullYear()}`;
//   };

//   const groupByMonth = (date) => {
//     const d = new Date(date);
//     return `${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
//   };

//   const groupByYear = (date) => new Date(date).getFullYear().toString();

//   const fetchChart = async () => {
//     setLoading(true);

//     try {
//       const res = await axios.get(`${API_BASE}/prices`);
//       let all = res.data.data || [];

//       if (selectedProduct)
//         all = all.filter((p) => p.name === selectedProduct);

//       if (selectedCategory)
//         all = all.filter((p) => p.category?.name === selectedCategory);

//       if (chartType === "custom" && startDate && endDate) {
//         const s = new Date(startDate);
//         const e = new Date(endDate);

//         all = all.filter((p) => {
//           const d = new Date(p.validTill || p.createdAt);
//           return d >= s && d <= e;
//         });
//       }

//       const groups = {};

//       all.forEach((item) => {
//         const date = item.validTill || item.createdAt;

//         let groupKey = "";

//         switch (chartType) {
//           case "weekly":
//             groupKey = groupByWeek(date);
//             break;
//           case "monthly":
//             groupKey = groupByMonth(date);
//             break;
//           case "yearly":
//             groupKey = groupByYear(date);
//             break;
//           default:
//             groupKey = new Date(date).toLocaleDateString("en-IN");
//         }

//         if (!groups[groupKey]) groups[groupKey] = [];
//         groups[groupKey].push(item);
//       });

//       const labels = Object.keys(groups);

//       const finalPriceAvg = labels.map((d) => {
//         const arr = groups[d];
//         return (
//           arr.reduce(
//             (sum, x) =>
//               sum + (Number(x.basePrice || 0) + Number(x.difference || 0)),
//             0
//           ) / arr.length
//         );
//       });

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Final Price (₹)",
//             data: finalPriceAvg,
//             borderColor: "#007bff",
//             backgroundColor: "rgba(0,123,255,0.3)",
//             tension: 0.35,
//           },
//         ],
//       });
//     } catch (err) {
//       console.error("Chart Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChart();
//   }, [selectedProduct, selectedCategory, chartType, startDate, endDate]);

//   return (
//     <div className="analytics-container">

//       {/* BACK BUTTON */}
//       <button className="back-btn" onClick={() => navigate(-1)}>
//         ⬅ Back
//       </button>

//       <h2 className="analytics-title">📈 Price Graph</h2>

//       {/* FILTERS — ONE LINE */}
//       <div className="filter-section">

//         {/* PRODUCT */}
//         <div className="filter-item">
//           <label>Product</label>
//           <button className="filter-btn">
//             <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
//               <option value="">All Products</option>
//               {productList.map((p) => (
//                 <option key={p._id} value={p.name}>{p.name}</option>
//               ))}
//             </select>
//           </button>
//         </div>

//         {/* CATEGORY */}
//         <div className="filter-item">
//           <label>Category</label>
//           <button className="filter-btn">
//             <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//               <option value="">All Categories</option>
//               {categoryList.map((c) => (
//                 <option key={c._id} value={c.name}>{c.name}</option>
//               ))}
//             </select>
//           </button>
//         </div>

//         {/* TYPE */}
//         <div className="filter-item">
//           <label>Type</label>
//           <button className="filter-btn">
//             <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//               <option value="custom">Custom</option>
//             </select>
//           </button>
//         </div>

//         {/* DATE RANGE */}
//         {chartType === "custom" && (
//           <>
//             <div className="filter-item">
//               <label>Start</label>
//               <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//             </div>

//             <div className="filter-item">
//               <label>End</label>
//               <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//             </div>
//           </>
//         )}
//       </div>

//       {/* APPLY BUTTON */}
//       <div className="apply-area">
//         <button className="apply-btn" onClick={fetchChart}>
//           Apply Filters
//         </button>
//       </div>

//       {/* CHART */}
//       <div className="chart-wrapper">
//         {loading ? (
//           <div className="loading">Loading...</div>
//         ) : (
//           <Line
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { position: "bottom" },
//                 datalabels: {
//                   color: "black",
//                   anchor: "end",
//                   align: "top",
//                   formatter: (v) => `₹${v}`,
//                   font: { size: 12, weight: "bold" },
//                 },
//               },
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PriceAnalytics;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import "./About.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const API_BASE = "https://grocerrybackend.vercel.app/api";

const PriceAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [chartType, setChartType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [p, c] = await Promise.all([
          axios.get(`${API_BASE}/prices`),
          axios.get(`${API_BASE}/categories`),
        ]);

        setProductList(p.data.data || []);
        setCategoryList(c.data.categories || []);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };
    fetchDropdowns();
  }, []);

  // GROUP HELPERS
  const groupByWeek = (d) => {
    const date = new Date(d);
    const first = new Date(date.getFullYear(), 0, 1);
    return `Week ${Math.ceil(((date - first) / 86400000 + first.getDay() + 1) / 7)} - ${date.getFullYear()}`;
  };

  const groupByMonth = (d) => {
    const date = new Date(d);
    return `${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear()}`;
  };

  const groupByYear = (d) => new Date(d).getFullYear().toString();

  const fetchChart = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/prices`);
      let all = res.data.data || [];

      if (selectedProduct)
        all = all.filter((p) => p.name === selectedProduct);

      if (selectedCategory)
        all = all.filter((p) => p.category?.name === selectedCategory);

      if (chartType === "custom" && startDate && endDate) {
        const s = new Date(startDate);
        const e = new Date(endDate);
        all = all.filter((p) => {
          const d = new Date(p.validTill || p.createdAt);
          return d >= s && d <= e;
        });
      }

      const groups = {};

      all.forEach((item) => {
        const date = item.validTill || item.createdAt;
        let key = "";

        switch (chartType) {
          case "weekly":
            key = groupByWeek(date);
            break;
          case "monthly":
            key = groupByMonth(date);
            break;
          case "yearly":
            key = groupByYear(date);
            break;
          default:
            key = new Date(date).toLocaleDateString("en-IN");
        }

        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
      });

      const labels = Object.keys(groups);
      const finalPriceAvg = labels.map((d) => {
        const arr = groups[d];
        return (
          arr.reduce(
            (sum, x) =>
              sum + (Number(x.basePrice || 0) + Number(x.difference || 0)),
            0
          ) / arr.length
        );
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Final Price (₹)",
            data: finalPriceAvg,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255,0.3)",
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      console.error("Chart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [selectedProduct, selectedCategory, chartType, startDate, endDate]);

  return (
    <div className="analytics-container">

      {/* Top Title Row */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h2 className="analytics-title">Price Analytics</h2>
      </div>

      {/* FILTER SECTION */}
      <div className="filter-section">

        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">All Products</option>
          {productList.map((p) => (
            <option key={p._id} value={p.name}>{p.name}</option>
          ))}
        </select>

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categoryList.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Custom Range</option>
        </select>

        {chartType === "custom" && (
          <>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </>
        )}

      </div>

      <div className="chart-wrapper">
        {loading ? (
          <div className="loading">Loading chart...</div>
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom" },
                datalabels: {
                  color: "black",
                  anchor: "end",
                  align: "top",
                  formatter: (v) => `₹${v}`,
                  font: { size: 12, weight: "bold" },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PriceAnalytics;

