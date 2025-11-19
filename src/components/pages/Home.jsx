// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Home.css";

// const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";

// export default function Home() {
//   const [prices, setPrices] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);

//   const [activeCategory, setActiveCategory] = useState("all");
//   const [activeSub, setActiveSub] = useState("all_sub");

//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const isWithinTime = () => {
//     const hour = new Date().getHours();
//     return hour >= 8 && hour <= 23;
//   };
//   const showRealPrice = isWithinTime();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const priceRes = await axios.get(PRICE_API);
//       const catRes = await axios.get(CATEGORY_API);

//       if (priceRes.data.success) {
//         const today = new Date().toDateString();
//         const validPrices = priceRes.data.data.filter((p) => {
//           if (!p.validTill) return true;
//           return new Date(p.validTill).toDateString() >= today;
//         });

//         setPrices(validPrices);
//         setFiltered(validPrices);
//       }

//       if (catRes.data.success) {
//         setCategories(catRes.data.categories || []);
//       }
//     } catch (err) {
//       console.error("Load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeCategory === "all") {
//       setSubcategories([]);
//       setActiveSub("all_sub");
//       return;
//     }

//     const cat = categories.find((c) => c._id === activeCategory);
//     setSubcategories(cat?.subcategories || []);
//     setActiveSub("all_sub");
//   }, [activeCategory, categories]);

//   useEffect(() => {
//     let data = [...prices];

//     if (activeCategory !== "all") {
//       data = data.filter((item) => item.category?._id === activeCategory);
//     }

//     if (activeSub !== "all_sub") {
//       data = data.filter((item) => item.subcategory?._id === activeSub);
//     }

//     if (search.trim()) {
//       data = data.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFiltered(data);
//   }, [activeCategory, activeSub, search, prices]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-text">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-layout">
//       <div className="category-sidebar">
//         <h3>Categories</h3>

//         <ul>
//           <li
//             className={activeCategory === "all" ? "active" : ""}
//             onClick={() => setActiveCategory("all")}
//           >
//             All
//           </li>

//           {categories.map((cat) => (
//             <li
//               key={cat._id}
//               className={activeCategory === cat._id ? "active" : ""}
//               onClick={() => setActiveCategory(cat._id)}
//             >
//               {cat.image && <img src={cat.image} alt="cat" />}
//               <span>{cat.name}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="home-wrapper">
//         {/* ⭐ SEARCH BAR */}
//         <div className="search-bar">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* ⭐ GRAPH BUTTON */}
//         <a href="/about" className="graph-btn">📊 View Graph</a>

//         {/* ⭐ BEAUTIFUL BANNER */}
//         <div className="promo-banner">
//           <h2>Grocerry</h2>
//           <p>📞 +91 98765 43210</p>
//         </div>

//         <div className="product-grid">
//           {filtered.length === 0 ? (
//             <p className="no-items">No items found</p>
//           ) : (
//             filtered.map((item, i) => (
//               <div className="product-item" key={i}>
//                 <div className="product-img">
//                   <img
//                     src={item.image || "https://via.placeholder.com/200"}
//                     alt={item.name}
//                   />
//                 </div>

//                 <div className="product-info">
//                   <h4>{item.name}</h4>

//                   {/* ⭐ TODAY PRICE FIRST */}
//                   <p className="price">
//                     Today Rate: ₹
//                     {item.basePrice + (item.difference || 0)}
//                   </p>

//                   {/* ⭐ TEJI/MANDI SECOND */}
//                   <p
//                     className={`difference ${
//                       item.difference >= 0 ? "positive" : "negative"
//                     }`}
//                   >
//                     TEJI/MANDI:{" "}
//                     {item.difference >= 0
//                       ? `+₹${item.difference}`
//                       : `₹${item.difference}`}
//                   </p>

//                   {/* ⭐ LIVE PRICE STATUS NOW AT BOTTOM */}
//                   {showRealPrice ? (
//                     <p className="store-status open">Live Price (8AM–11PM)</p>
//                   ) : (
//                     <p className="store-status closed">Store Closed (8AM–11PM)</p>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import image from "../../assets/image.jpg";

const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";
const DESC_API = "https://grocerrybackend.vercel.app/api/descriptions";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const isWithinTime = () => {
    const hour = new Date().getHours();
    return hour >= 8 && hour <= 23;
  };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const priceRes = await axios.get(PRICE_API);
      const catRes = await axios.get(CATEGORY_API);
      const descRes = await axios.get(DESC_API);

      if (priceRes.data.success) {
        setPrices(priceRes.data.data);
      }

      if (descRes.data.success) {
        setDescriptions(descRes.data.data); // store description list
      }

      if (catRes.data.success) {
        setCategories(catRes.data.categories || []);
      }

    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* MERGE DESCRIPTION WITH PRODUCT */
 const mergeData = () => {
  const globalDescription = descriptions[0]?.description || "";  // first description

  return prices.map((item) => ({
    ...item,
    description: globalDescription
  }));
};


  /* FILTERING */
  useEffect(() => {
    const merged = mergeData();
    let data = [...merged];

    if (activeCategory !== "all") {
      data = data.filter((item) => item.category?._id === activeCategory);
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, search, prices, descriptions]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="home-layout">

      {/* SIDEBAR */}
      <div className="side-category">
        <div
          className={`side-cat-item all-item ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="All" />
          <span>All</span>
        </div>

        {categories.map(cat => (
          <div
            key={cat._id}
            className={`side-cat-item ${activeCategory === cat._id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat._id)}
          >
            <img src={cat.image} alt="" />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="home-main">

        {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
 
         <li style={{
  listStyle: "none",
  margin: "10px 0",
}}>
  <Link
    to="/about"
    style={{
      display: "block",
      padding: "10px 16px",
      background: "#f3f4f6",
      borderRadius: "10px",
      color: "#111",
      fontSize: "15px",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all 0.25s ease",
      border: "1px solid #e5e7eb"
    }}
    onMouseOver={(e) => {
      e.target.style.background = "#3b82f6";
      e.target.style.color = "#fff";
      e.target.style.transform = "translateX(4px)";
    }}
    onMouseOut={(e) => {
      e.target.style.background = "#f3f4f6";
      e.target.style.color = "#111";
      e.target.style.transform = "translateX(0px)";
    }}
  >
    📊 Product Graph
  </Link>
</li>

        {/* BANNER */}
        <div className="top-banner">
          <img src={image} alt="banner" className="hero-banner" />
        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filtered.map((item, i) => (
            <div className="product-card" key={i}>
              
              <img src={item.image} alt={item.name} />

              <h4>{item.name}</h4>

              <p className="p-price">
                Today Price: ₹{item.basePrice + item.difference}
              </p>

              <div className="p-bottom">
                <p
                  className={`difference ${
                    item.difference >= 0 ? "positive" : "negative"
                  }`}
                >
                  TEJI/MANDI:{" "}
                  {item.difference >= 0
                    ? `+₹${item.difference}`
                    : `₹${item.difference}`}
                </p>
              </div>

              {/* ⭐ DESCRIPTION EXACT TEJI/MANDI KE NICHE */}
              {item.description && (
                <p className="product-description">{item.description}</p>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

