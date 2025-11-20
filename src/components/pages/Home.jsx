// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Home.css";
// import { Link } from "react-router-dom";

// import banner1 from "../../assets/Grocery Banner 1.png";
// import banner2 from "../../assets/Grocery BAnner 2.png";

// const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";
// const DESC_API = "https://grocerrybackend.vercel.app/api/descriptions";

// export default function Home() {
//   const [prices, setPrices] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [activeSub, setActiveSub] = useState("all-sub");
//   const [subList, setSubList] = useState([]);

//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* LOAD DATA */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const priceRes = await axios.get(PRICE_API);
//       const catRes = await axios.get(CATEGORY_API);
//       const descRes = await axios.get(DESC_API);

//       if (priceRes.data.success) setPrices(priceRes.data.data);
//       if (descRes.data.success) setDescriptions(descRes.data.data);

//       if (catRes.data.success)
//         setCategories(catRes.data.categories || catRes.data.data || []);

//     } catch (err) {
//       console.error("Load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* MERGE DESCRIPTION */
//   const mergeData = () => {
//     const globalDescription = descriptions[0]?.description || "";
//     return prices.map((item) => ({
//       ...item,
//       description: globalDescription,
//     }));
//   };

//   /* FILTER LOGIC */
//   useEffect(() => {
//     const merged = mergeData();
//     let data = [...merged];

//     /* MAIN CATEGORY FILTER */
//     if (activeCategory !== "all") {
//       data = data.filter(
//         (item) =>
//           item.category?._id === activeCategory ||
//           item.subCategory?._id === activeCategory ||
//           item.subcategory?._id === activeCategory
//       );
//     }

//     /* SUBCATEGORY FILTER */
//     if (activeSub !== "all-sub") {
//       data = data.filter((item) => {
//         const subId =
//           item.subCategory?._id ||
//           item.subcategory?._id ||
//           item.subcategories?._id;

//         return subId === activeSub;
//       });
//     }

//     /* SEARCH FILTER */
//     if (search.trim()) {
//       data = data.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFiltered(data);
//   }, [activeCategory, activeSub, search, prices, descriptions]);

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div className="home-layout">

//       {/* SIDEBAR */}
//       <div className="side-category">

//         {/* ALL CATEGORY */}
//         <div
//           className={`side-cat-item all-item ${activeCategory === "all" ? "active" : ""}`}
//           onClick={() => {
//             setActiveCategory("all");
//             setActiveSub("all-sub");
//             setSubList([]);
//           }}
//         >
//           <span>All</span>
//         </div>

//         {/* MAIN CATEGORIES */}
//         {categories.map((cat) => (
//           <div key={cat._id}>
//             <div
//               className={`side-cat-item ${activeCategory === cat._id ? "active" : ""}`}
//               onClick={() => {
//                 setActiveCategory(cat._id);
//                 setActiveSub("all-sub");
//                 setSubList(cat.subcategories || []);
//               }}
//             >
//               <img src={cat.image} alt="" />
//               <span>{cat.name}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="home-main">

//         {/* SCROLLABLE BANNERS */}
//         <div className="banner-scroll">
//           <div className="banner-item">
//             <img src={banner1} className="hero-banner" alt="banner1" />
//           </div>

//           <div className="banner-item">
//             <img src={banner2} className="hero-banner" alt="banner2" />
//           </div>
//         </div>

//         {/* SEE PRICE GRAPH BUTTON */}
//         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//           <li style={{ listStyle: "none" }}>
//             <Link
//               to="/about"
//               style={{
//                 marginRight: "12px",
//                 paddingRight: "20px",
//                 display: "inline-block",
//                 padding: "6px 10px",
//                 fontSize: "11px",
//                 fontWeight: "700",
//                 color: "#fff",
//                 textDecoration: "none",
//                 borderRadius: "8px",
//                 background: "linear-gradient(135deg, #60fa7aff, #0b7b29ff, #60fa7aff)",
//                 border: "1px solid rgba(255,255,255,0.3)",
//                 boxShadow: "0 3px 0 #090b11ff, 0 4px 10px rgba(0,0,0,0.2)",
//                 transition: "all 0.2s ease",
//                 userSelect: "none",
//               }}
//             >
//               See Price Graph
//             </Link>
//           </li>
//         </div>

//         {/* SEARCH BAR */}
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* SUBCATEGORY DROPDOWN */}
//         {subList.length > 0 && (
//           <div className="sub-dropdown">
//             <select value={activeSub} onChange={(e) => setActiveSub(e.target.value)}>
//               <option value="all-sub">All Subcategories</option>

//               {subList.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* PRODUCT GRID */}
//         <div className="product-grid">
//           {filtered.map((item, i) => (
//             <div className="product-card" key={i}>
//               <img src={item.image} alt={item.name} />

//               <h4>{item.name}</h4>

//               <p className="p-price">Today Price: ₹{item.basePrice + item.difference}</p>

//               <div className="p-bottom">
//                 <p className={`difference ${item.difference >= 0 ? "positive" : "negative"}`}>
//                   TEJI/MANDI: {item.difference >= 0 ? `+₹${item.difference}` : `₹${item.difference}`}
//                 </p>
//               </div>

//               {item.description && (
//                 <p className="product-description">{item.description}</p>
//               )}
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

import banner1 from "../../assets/Grocery Banner 1.png";
import banner2 from "../../assets/Grocery BAnner 2.png";

const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";
const DESC_API = "https://grocerrybackend.vercel.app/api/descriptions";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSub, setActiveSub] = useState("all-sub");
  const [subList, setSubList] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ⭐ LIVE DATE TIME STATE
  const [liveDate, setLiveDate] = useState("");

  /* LOAD DATA */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const priceRes = await axios.get(PRICE_API);
      const catRes = await axios.get(CATEGORY_API);
      const descRes = await axios.get(DESC_API);

      if (priceRes.data.success) setPrices(priceRes.data.data);
      if (descRes.data.success) setDescriptions(descRes.data.data);

      if (catRes.data.success)
        setCategories(catRes.data.categories || catRes.data.data || []);

    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ⭐ LIVE CLOCK EFFECT */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const formatted =
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        " | " +
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

      setLiveDate(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ⭐ MERGE DATA FIXED WITH useCallback (no warnings) */
  const mergeData = useCallback(() => {
    const globalDescription = descriptions[0]?.description || "";
    return prices.map((item) => ({
      ...item,
      description: globalDescription,
    }));
  }, [prices, descriptions]);

  /* FILTER LOGIC */
  useEffect(() => {
    const merged = mergeData();
    let data = [...merged];

    /* MAIN CATEGORY FILTER */
    if (activeCategory !== "all") {
      data = data.filter(
        (item) =>
          item.category?._id === activeCategory ||
          item.subCategory?._id === activeCategory ||
          item.subcategory?._id === activeCategory
      );
    }

    /* SUBCATEGORY FILTER */
    if (activeSub !== "all-sub") {
      data = data.filter((item) => {
        const subId =
          item.subCategory?._id ||
          item.subcategory?._id ||
          item.subcategories?._id;

        return subId === activeSub;
      });
    }

    /* SEARCH FILTER */
    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, activeSub, search, mergeData]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="home-layout">

      {/* SIDEBAR */}
      <div className="side-category">

        {/* ALL CATEGORY */}
        <div
          className={`side-cat-item all-item ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => {
            setActiveCategory("all");
            setActiveSub("all-sub");
            setSubList([]);
          }}
        >
          <span>All</span>
        </div>

        {/* MAIN CATEGORIES */}
        {categories.map((cat) => (
          <div key={cat._id}>
            <div
              className={`side-cat-item ${activeCategory === cat._id ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat._id);
                setActiveSub("all-sub");
                setSubList(cat.subcategories || []);
              }}
            >
              <img src={cat.image} alt="" />
              <span>{cat.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="home-main">

        {/* SCROLLABLE BANNERS */}
        <div className="banner-scroll">
          <div className="banner-item">
            <img src={banner1} className="hero-banner" alt="banner1" />
          </div>

          <div className="banner-item">
            <img src={banner2} className="hero-banner" alt="banner2" />
          </div>
        </div>

        {/* ⭐ LIVE DATE + SEE GRAPH BUTTON */}
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          alignItems: "center",
          gap: "40px",
          marginRight: "12px"
        }}>
          
          {/* LIVE DATE & TIME */}
          <div 
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#1f2937",
              background: "#f3f4f6",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            {liveDate}
          </div>

            {/* SEE PRICE GRAPH BUTTON */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <li style={{ listStyle: "none" }}>
            <Link
              to="/about"
              style={{
                marginRight: "12px",
                paddingRight: "20px",
                display: "inline-block",
                padding: "6px 10px",
                fontSize: "11px",
                fontWeight: "700",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #60fa7aff, #0b7b29ff, #60fa7aff)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 3px 0 #090b11ff, 0 4px 10px rgba(0,0,0,0.2)",
                transition: "all 0.2s ease",
                userSelect: "none",
              }}
            >
              See Price Graph
            </Link>
          </li>
        </div>

        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* SUBCATEGORY DROPDOWN */}
        {subList.length > 0 && (
          <div className="sub-dropdown">
            <select value={activeSub} onChange={(e) => setActiveSub(e.target.value)}>
              <option value="all-sub">All Subcategories</option>

              {subList.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filtered.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.image} alt={item.name} />

              <h4>{item.name}</h4>

              <p className="p-price">Today Price: ₹{item.basePrice + item.difference}</p>

              <div className="p-bottom">
                <p className={`difference ${item.difference >= 0 ? "positive" : "negative"}`}>
                  TEJI/MANDI: {item.difference >= 0 ? `+₹${item.difference}` : `₹${item.difference}`}
                </p>
              </div>

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





