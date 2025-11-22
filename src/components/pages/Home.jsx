// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "./Home.css";
// import { Link } from "react-router-dom";

// // import banner1 from "../../assets/Grocery Banner 1.png";
// // import banner2 from "../../assets/Grocery BAnner 2.png";

// // ⭐ WEBSITE API (only active items)
// const PRICE_API = "https://grocerrybackend.vercel.app/api/prices/website";
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

//   const [liveDate, setLiveDate] = useState("");

//   /* LOAD DATA */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const priceRes = await axios.get(PRICE_API); // ⭐ Only active data
//       const catRes = await axios.get(CATEGORY_API);
//       const descRes = await axios.get(DESC_API);

//       if (priceRes.data.success) {
//         // Filter → only active products should show
//         const activeOnly = priceRes.data.data.filter(
//           (p) => p.status === "active"
//         );
//         setPrices(activeOnly);
//       }

//       if (descRes.data.success) setDescriptions(descRes.data.data);
//       if (catRes.data.success)
//         setCategories(catRes.data.categories || catRes.data.data || []);
//     } catch (err) {
//       console.error("Load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* LIVE CLOCK */
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();

//       const formatted =
//         now.toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         }) +
//         " | " +
//         now.toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         });

//       setLiveDate(formatted);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   /* MERGE DATA */
//   const mergeData = useCallback(() => {
//     const globalDescription = descriptions[0]?.description || "";
//     return prices.map((item) => ({
//       ...item,
//       description: globalDescription,
//     }));
//   }, [prices, descriptions]);

//   /* FILTER HANDLING */
//   useEffect(() => {
//     const merged = mergeData();
//     let data = [...merged];

//     if (activeCategory !== "all") {
//       data = data.filter((item) => {
//         const catId =
//           item?.category?._id ||
//           item?.subCategory?._id ||
//           item?.subcategory?._id;
//         return catId === activeCategory;
//       });
//     }

//     if (activeSub !== "all-sub") {
//       data = data.filter((item) => {
//         const subId =
//           item.subCategory?._id ||
//           item.subcategory?._id ||
//           item.subcategories?._id ||
//           item.subCategory ||
//           item.subcategory;
//         return subId === activeSub;
//       });
//     }

//     if (search.trim()) {
//       data = data.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFiltered(data);
//   }, [activeCategory, activeSub, search, mergeData]);

//   if (loading) return <h2>Loading...</h2>;

//   return (
//     <div className="home-layout">

//       {/* SIDEBAR */}
//       <div className="side-category">

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

//         {categories.map((cat) => {
//           const subs =
//             cat.subcategories ||
//             cat.subCategory ||
//             cat.subcategory ||
//             [];

//           return (
//             <div key={cat._id}>
//               <div
//                 className={`side-cat-item ${activeCategory === cat._id ? "active" : ""}`}
//                 onClick={() => {
//                   setActiveCategory(cat._id);
//                   setActiveSub("all-sub");
//                   setSubList(subs);
//                 }}
//               >
//                 <img src={cat.image} alt="" />
//                 <span>{cat.name}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="home-main">

//         {/* <div className="banner-scroll">
//           <div className="banner-item">
//             <img src={banner1} className="hero-banner" alt="banner1" />
//           </div>
//           <div className="banner-item">
//             <img src={banner2} className="hero-banner" alt="banner2" />
//           </div>
//         </div> */}

//         <div className="top-info-row">
//           <div className="live-btn">LIVE</div>
//           <div className="live-date-box">{liveDate}</div>

//           <Link
//             to="/about"
//             style={{
//               padding: "4px 8px",
//               fontSize: "10px",
//               fontWeight: "700",
//               color: "#fff",
//               textDecoration: "none",
//               borderRadius: "8px",
//               background: "linear-gradient(135deg, #60fa7a, #0b7b29, #60fa7a)",
//               border: "1px solid rgba(255,255,255,0.3)",
//               boxShadow: "0 3px 0 #090b11, 0 4px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             See Price Graph
//           </Link>
//         </div>

//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

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

//               <p className="p-price">Today Price: ₹{item.finalPrice}</p>

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

// ⭐ WEBSITE API (only active items)
const PRICE_API = "https://grocerrybackend.vercel.app/api/prices/website";
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

      if (priceRes.data.success) {
        const activeOnly = priceRes.data.data.filter((p) => p.status === "active");
        setPrices(activeOnly);
      }

      if (descRes.data.success) setDescriptions(descRes.data.data);
      if (catRes.data.success)
        setCategories(catRes.data.categories || catRes.data.data || []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* LIVE CLOCK */
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

  /* MERGE DATA */
  const mergeData = useCallback(() => {
    const globalDescription = descriptions[0]?.description || "";
    return prices.map((item) => ({
      ...item,
      description: globalDescription,
    }));
  }, [prices, descriptions]);

  /* FILTER HANDLING */
  useEffect(() => {
    const merged = mergeData();
    let data = [...merged];

    if (activeCategory !== "all") {
      data = data.filter((item) => {
        const catId =
          item?.category?._id ||
          item?.subCategory?._id ||
          item?.subcategory?._id;
        return catId === activeCategory;
      });
    }

    if (activeSub !== "all-sub") {
      data = data.filter((item) => {
        const subId =
          item.subCategory?._id ||
          item.subcategory?._id ||
          item.subcategories?._id ||
          item.subCategory ||
          item.subcategory;
        return subId === activeSub;
      });
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, activeSub, search, mergeData]);

  /* =============================
        🎯 CUSTOM LOADING SCREEN
     ============================= */
  if (loading) {
    return (
      <div className="loader-wrapper">
        <h2 className="loader-title">Welcome to SG OVERSEAS</h2>
        <div className="loader-circle"></div>
      </div>
    );
  }

  return (
    <div className="home-layout">

      {/* SIDEBAR */}
      <div className="side-category">

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

        {categories.map((cat) => {
          const subs =
            cat.subcategories ||
            cat.subCategory ||
            cat.subcategory ||
            [];

          return (
            <div key={cat._id}>
              <div
                className={`side-cat-item ${activeCategory === cat._id ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat._id);
                  setActiveSub("all-sub");
                  setSubList(subs);
                }}
              >
                <img src={cat.image} alt="" />
                <span>{cat.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="home-main">

        <div className="top-info-row">
          <div className="live-btn">LIVE</div>
          <div className="live-date-box">{liveDate}</div>

          <Link
            to="/about"
            style={{
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: "700",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #60fa7a, #0b7b29, #60fa7a)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 3px 0 #090b11, 0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            See Price Graph
          </Link>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
              <img src={item.image} />
              <h4>{item.name}</h4>

              <p className="p-price">Today Price: ₹{item.finalPrice}</p>

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











