// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import './About.css';

// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";
// // import { Bar } from "react-chartjs-2";


// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const API_BASE = "https://grocerrybackend.vercel.app/api";

// // const PriceAnalytics = () => {
// //   const [loading, setLoading] = useState(true);
// //   const [productList, setProductList] = useState([]);
// //   const [categoryList, setCategoryList] = useState([]);
// //   const [selectedProduct, setSelectedProduct] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [chartData, setChartData] = useState(null);

// //   // 🔹 Fetch dropdowns
// //   useEffect(() => {
// //     const fetchDropdowns = async () => {
// //       try {
// //         const [products, categories] = await Promise.all([
// //           axios.get(`${API_BASE}/prices`),
// //           axios.get(`${API_BASE}/categories`),
// //         ]);
// //         setProductList(products.data.data || []);
// //         setCategoryList(categories.data.categories || []);
// //       } catch (err) {
// //         console.error("Dropdown fetch error:", err);
// //       }
// //     };
// //     fetchDropdowns();
// //   }, []);

// //   // 🔹 Fetch chart data with date filter
// //   const fetchChart = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${API_BASE}/prices`);
// //       const allPrices = res.data.data || [];

// //       // ✅ Filter by Product / Category
// //       let filtered = allPrices;
// //       if (selectedProduct)
// //         filtered = filtered.filter((p) => p.name === selectedProduct);
// //       if (selectedCategory)
// //         filtered = filtered.filter(
// //           (p) => p.category?.name === selectedCategory
// //         );

// //       // ✅ Filter by Date Range (using validTill or createdAt)
// //       if (startDate && endDate) {
// //         const start = new Date(startDate);
// //         const end = new Date(endDate);
// //         filtered = filtered.filter((item) => {
// //           const date = new Date(item.validTill || item.createdAt);
// //           return date >= start && date <= end;
// //         });
// //       }

// //       // ✅ Group data by Date
// //       const groupedByDate = {};
// //       filtered.forEach((item) => {
// //         const dateKey = new Date(
// //           item.validTill || item.createdAt
// //         ).toLocaleDateString("en-IN");
// //         if (!groupedByDate[dateKey]) {
// //           groupedByDate[dateKey] = [];
// //         }
// //         groupedByDate[dateKey].push(item);
// //       });

// //       // ✅ Prepare chart arrays
// //       const labels = Object.keys(groupedByDate);
// //       const avgBasePrice = labels.map((d) => {
// //         const dayData = groupedByDate[d];
// //         return (
// //           dayData.reduce((sum, i) => sum + Number(i.basePrice || 0), 0) /
// //           dayData.length
// //         );
// //       });

// //       const avgDiff = labels.map((d) => {
// //         const dayData = groupedByDate[d];
// //         return (
// //           dayData.reduce((sum, i) => sum + Number(i.difference || 0), 0) /
// //           dayData.length
// //         );
// //       });

// //       const totalCount = labels.map((d) => groupedByDate[d].length);

// //       // ✅ Build chart dataset
// //       setChartData({
// //         labels,
// //         datasets: [
// //           {
// //             label: "Average Base Price (₹)",
// //             data: avgBasePrice,
// //             backgroundColor: "rgba(0, 123, 255, 0.6)",
// //             borderRadius: 6,
// //           },
// //           {
// //             label: "Average Difference (₹)",
// //             data: avgDiff,
// //             backgroundColor: "rgba(255, 193, 7, 0.6)",
// //             borderRadius: 6,
// //           },
// //           {
// //             label: "Total Products Count",
// //             data: totalCount,
// //             backgroundColor: "rgba(40, 167, 69, 0.6)",
// //             borderRadius: 6,
// //           },
// //         ],
// //       });
// //     } catch (err) {
// //       console.error("Chart fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChart();
// //   }, [selectedProduct, selectedCategory, startDate, endDate]);

// //   return (
// //     <div className="analytics-container">
// //       <h2 className="analytics-title">📅 Price History & Analytics</h2>
// //       <p className="analytics-subtitle">
// //         Track your product & category price trends over time
// //       </p>

// //       {/* 🔹 Filters */}
// //       <div className="filter-section">
// //         <div className="filter-group">
// //           <label>🧃 Product:</label>
// //           <select
// //             value={selectedProduct}
// //             onChange={(e) => setSelectedProduct(e.target.value)}
// //           >
// //             <option value="">All Products</option>
// //             {productList.map((p) => (
// //               <option key={p._id} value={p.name}>
// //                 {p.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="filter-group">
// //           <label>🗂️ Category:</label>
// //           <select
// //             value={selectedCategory}
// //             onChange={(e) => setSelectedCategory(e.target.value)}
// //           >
// //             <option value="">All Categories</option>
// //             {categoryList.map((c) => (
// //               <option key={c._id} value={c.name}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="filter-group">
// //           <label>📆 From:</label>
// //           <input
// //             type="date"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //           />
// //         </div>

// //         <div className="filter-group">
// //           <label>➡️ To:</label>
// //           <input
// //             type="date"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //           />
// //         </div>

// //         <button className="btn refresh" onClick={fetchChart}>
// //           🔄 Apply
// //         </button>
// //       </div>

// //       {/* 🔹 Chart */}
// //       <div className="chart-wrapper">
// //         {loading ? (
// //           <div className="loading">Loading chart...</div>
// //         ) : chartData ? (
// //           <Bar
// //             data={chartData}
// //             options={{
// //               responsive: true,
// //               maintainAspectRatio: false,
// //               plugins: {
// //                 legend: { position: "bottom" },
// //                 tooltip: {
// //                   callbacks: {
// //                     label: (context) =>
// //                       `${context.dataset.label}: ${
// //                         context.dataset.label.includes("Count")
// //                           ? context.parsed.y
// //                           : "₹" + context.parsed.y.toFixed(2)
// //                       }`,
// //                   },
// //                 },
// //               },
// //               scales: {
// //                 x: {
// //                   ticks: { color: "#333" },
// //                   title: {
// //                     display: true,
// //                     text: "Date (by Validity)",
// //                     color: "#444",
// //                     font: { weight: "bold" },
// //                   },
// //                 },
// //                 y: {
// //                   beginAtZero: true,
// //                   title: {
// //                     display: true,
// //                     text: "Price / Count",
// //                     color: "#444",
// //                     font: { weight: "bold" },
// //                   },
// //                 },
// //               },
// //             }}
// //           />
// //         ) : (
// //           <div className="no-data">No data found for selection.</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PriceAnalytics;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import './About.css';

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
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const API_BASE = "https://grocerrybackend.vercel.app/api";

// const PriceAnalytics = () => {
//   const [loading, setLoading] = useState(true);
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [chartData, setChartData] = useState(null);

//   // 🔹 Fetch dropdown data
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [products, categories] = await Promise.all([
//           axios.get(`${API_BASE}/prices`),
//           axios.get(`${API_BASE}/categories`),
//         ]);
//         setProductList(products.data.data || []);
//         setCategoryList(categories.data.categories || []);
//       } catch (err) {
//         console.error("Dropdown fetch error:", err);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   // 🔹 Fetch Chart Data
//   const fetchChart = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/prices`);
//       const allPrices = res.data.data || [];

//       let filtered = allPrices;

//       // Filter by product
//       if (selectedProduct)
//         filtered = filtered.filter((p) => p.name === selectedProduct);

//       // Filter by category
//       if (selectedCategory)
//         filtered = filtered.filter((p) => p.category?.name === selectedCategory);

//       // Filter by date range
//       if (startDate && endDate) {
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         filtered = filtered.filter((item) => {
//           const date = new Date(item.validTill || item.createdAt);
//           return date >= start && date <= end;
//         });
//       }

//       // Group by date
//       const grouped = {};
//       filtered.forEach((item) => {
//         const key = new Date(
//           item.validTill || item.createdAt
//         ).toLocaleDateString("en-IN");
//         if (!grouped[key]) grouped[key] = [];
//         grouped[key].push(item);
//       });

//       const labels = Object.keys(grouped);

//       const avgBasePrice = labels.map((d) => {
//         const day = grouped[d];
//         return (
//           day.reduce((s, i) => s + Number(i.basePrice || 0), 0) / day.length
//         );
//       });

//       const avgDiff = labels.map((d) => {
//         const day = grouped[d];
//         return (
//           day.reduce((s, i) => s + Number(i.difference || 0), 0) / day.length
//         );
//       });

//       const count = labels.map((d) => grouped[d].length);

//       // 🔹 Prepare Line Chart Data
//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Average Base Price (₹)",
//             data: avgBasePrice,
//             borderColor: "rgba(0, 123, 255, 0.9)",
//             backgroundColor: "rgba(0, 123, 255, 0.3)",
//             tension: 0.4,
//             borderWidth: 3,
//             pointRadius: 4,
//           },
//           {
//             label: "Average Difference (₹)",
//             data: avgDiff,
//             borderColor: "rgba(255, 193, 7, 0.9)",
//             backgroundColor: "rgba(255, 193, 7, 0.3)",
//             tension: 0.4,
//             borderWidth: 3,
//             pointRadius: 4,
//           },
//           {
//             label: "Total Products Count",
//             data: count,
//             borderColor: "rgba(40, 167, 69, 0.9)",
//             backgroundColor: "rgba(40, 167, 69, 0.3)",
//             tension: 0.4,
//             borderWidth: 3,
//             pointRadius: 4,
//           },
//         ],
//       });
//     } catch (err) {
//       console.error("Chart fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChart();
//   }, [selectedProduct, selectedCategory, startDate, endDate]);

//   return (
//     <div className="analytics-container">
//       <h2 className="analytics-title">📈 Price History & Analytics (Line Chart)</h2>
//       <p className="analytics-subtitle">
//         Track product and category price trends visually
//       </p>

//       {/* 🔹 FILTER SECTION */}
//       <div className="filter-section">
//         <div className="filter-group">
//           <label>🧃 Product:</label>
//           <select
//             value={selectedProduct}
//             onChange={(e) => setSelectedProduct(e.target.value)}
//           >
//             <option value="">All Products</option>
//             {productList.map((p) => (
//               <option key={p._id} value={p.name}>{p.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="filter-group">
//           <label>🗂️ Category:</label>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categoryList.map((c) => (
//               <option key={c._id} value={c.name}>{c.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="filter-group">
//           <label>📆 From:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>

//         <div className="filter-group">
//           <label>➡️ To:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         <button className="btn refresh" onClick={fetchChart}>
//           🔄 Apply
//         </button>
//       </div>

//       {/* 🔹 CHART SECTION */}
//       <div className="chart-wrapper">
//         {loading ? (
//           <div className="loading">⏳ Loading chart...</div>
//         ) : chartData ? (
//           <Line
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: { position: "bottom" },
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: "Date",
//                     color: "#333",
//                     font: { weight: "bold" },
//                   },
//                 },
//                 y: {
//                   beginAtZero: true,
//                   title: {
//                     display: true,
//                     text: "Values",
//                     color: "#333",
//                     font: { weight: "bold" },
//                   },
//                 },
//               },
//             }}
//           />
//         ) : (
//           <div className="no-data">No data found.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PriceAnalytics;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css"
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

  // NEW FILTER STATE
  const [chartType, setChartType] = useState("daily"); // daily, weekly, monthly, yearly, custom
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

  // 🔥 GROUPING HELPERS
  const groupByWeek = (date) => {
    const d = new Date(date);
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    return `Week ${week} - ${d.getFullYear()}`;
  };

  const groupByMonth = (date) => {
    const d = new Date(date);
    return `${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
  };

  const groupByYear = (date) => {
    return new Date(date).getFullYear().toString();
  };

  const fetchChart = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/prices`);
      let all = res.data.data || [];

      // PRODUCT FILTER
      if (selectedProduct)
        all = all.filter((p) => p.name === selectedProduct);

      // CATEGORY FILTER
      if (selectedCategory)
        all = all.filter((p) => p.category?.name === selectedCategory);

      // RANGE FILTER
      if (chartType === "custom" && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        all = all.filter((p) => {
          const d = new Date(p.validTill || p.createdAt);
          return d >= start && d <= end;
        });
      }

      // GROUP DATA
      const groups = {};

      all.forEach((item) => {
        const date = item.validTill || item.createdAt;

        let groupKey = "";

        switch (chartType) {
          case "weekly":
            groupKey = groupByWeek(date);
            break;
          case "monthly":
            groupKey = groupByMonth(date);
            break;
          case "yearly":
            groupKey = groupByYear(date);
            break;
          default:
            groupKey = new Date(date).toLocaleDateString("en-IN");
        }

        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(item);
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
      <h2 className="analytics-title">📈 Price Analytics</h2>

      <div className="filter-section">
        
        {/* PRODUCT */}
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">All Products</option>
          {productList.map((p) => (
            <option key={p._id} value={p.name}>{p.name}</option>
          ))}
        </select>

        {/* CATEGORY */}
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categoryList.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* TYPE FILTER */}
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="custom">Custom Range</option>
        </select>

        {/* DATE RANGE ONLY IF CUSTOM */}
        {chartType === "custom" && (
          <>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </>
        )}

        <button className="btn refresh" onClick={fetchChart}>Apply</button>
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
