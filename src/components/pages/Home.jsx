
// // // import React, { useEffect, useState, useCallback } from "react";
// // // import axios from "axios";
// // // import "./Home.css";
// // // import { Link } from "react-router-dom";

// // // // WEBSITE API (ONLY ACTIVE ITEMS)
// // // const PRICE_API = "https://grocerrybackend.vercel.app/api/prices/website";
// // // const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";
// // // const DESC_API = "https://grocerrybackend.vercel.app/api/descriptions";

// // // export default function Home() {
// // //   const [prices, setPrices] = useState([]);
// // //   const [descriptions, setDescriptions] = useState([]);
// // //   const [filtered, setFiltered] = useState([]);
// // //   const [categories, setCategories] = useState([]);

// // //   const [activeCategory, setActiveCategory] = useState("all");
// // //   const [activeSub, setActiveSub] = useState("all-sub");
// // //   const [subList, setSubList] = useState([]);

// // //   const [search, setSearch] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   const [liveDate, setLiveDate] = useState("");

// // //   // ⭐ TIME BASED PRICE HIDING (11PM TO 8AM)
// // //   const isHiddenTime = () => {
// // //     const now = new Date();
// // //     const hour = now.getHours();
// // //     return hour >= 23 || hour < 8; // 23 = 11PM
// // //   };

// // //   // LOAD DATA ON START
// // //   useEffect(() => {
// // //     loadData();
// // //   }, []);

// // //   const loadData = async () => {
// // //     try {
// // //       const priceRes = await axios.get(PRICE_API);
// // //       const catRes = await axios.get(CATEGORY_API);
// // //       const descRes = await axios.get(DESC_API);

// // //       if (priceRes.data.success) {
// // //         const activeOnly = priceRes.data.data.filter((p) => p.status === "active");
// // //         setPrices(activeOnly);
// // //       }

// // //       if (descRes.data.success) setDescriptions(descRes.data.data);
// // //       if (catRes.data.success)
// // //         setCategories(catRes.data.categories || catRes.data.data || []);
// // //     } catch (err) {
// // //       console.error("Load error:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // LIVE CLOCK
// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       const now = new Date();
// // //       const formatted =
// // //         now.toLocaleDateString("en-IN", {
// // //           day: "2-digit",
// // //           month: "short",
// // //           year: "numeric",
// // //         }) +
// // //         " | " +
// // //         now.toLocaleTimeString("en-IN", {
// // //           hour: "2-digit",
// // //           minute: "2-digit",
// // //           second: "2-digit",
// // //         });

// // //       setLiveDate(formatted);
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   // MERGE GLOBAL DESCRIPTION WITH PRODUCTS
// // //   const mergeData = useCallback(() => {
// // //     const globalDescription = descriptions[0]?.description || "";

// // //     return prices.map((item) => ({
// // //       ...item,
// // //       globalDescription: globalDescription,
// // //     }));
// // //   }, [prices, descriptions]);

// // //   // FILTERING SYSTEM
// // //   useEffect(() => {
// // //     let data = mergeData();

// // //     if (activeCategory !== "all") {
// // //       data = data.filter((item) => {
// // //         const catId = item.category?._id || item.subcategory?._id;
// // //         return catId === activeCategory;
// // //       });
// // //     }

// // //     if (activeSub !== "all-sub") {
// // //       data = data.filter((item) => {
// // //         const subId = item.subcategory?._id || item.subcategory;
// // //         return subId === activeSub;
// // //       });
// // //     }

// // //     if (search.trim()) {
// // //       data = data.filter((item) =>
// // //         item.name.toLowerCase().includes(search.toLowerCase())
// // //       );
// // //     }

// // //     setFiltered(data);
// // //   }, [activeCategory, activeSub, search, mergeData]);

// // //   // LOADING SCREEN
// // //   if (loading) {
// // //     return (
// // //       <div className="loader-wrapper">
// // //         <h2 className="loader-title">Welcome to SG OVERSEAS</h2>
// // //         <div className="loader-circle"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="home-layout">

// // //       {/* SIDEBAR */}
// // //       <div className="side-category">
// // //         <div
// // //           className={`side-cat-item all-item ${activeCategory === "all" ? "active" : ""}`}
// // //           onClick={() => {
// // //             setActiveCategory("all");
// // //             setActiveSub("all-sub");
// // //             setSubList([]);
// // //           }}
// // //         >
// // //           <span>All</span>
// // //         </div>

// // //         {categories.map((cat) => {
// // //           const subs = cat.subcategories || [];

// // //           return (
// // //             <div key={cat._id}>
// // //               <div
// // //                 className={`side-cat-item ${
// // //                   activeCategory === cat._id ? "active" : ""
// // //                 }`}
// // //                 onClick={() => {
// // //                   setActiveCategory(cat._id);
// // //                   setActiveSub("all-sub");
// // //                   setSubList(subs);
// // //                 }}
// // //               >
// // //                 <img src={cat.image} alt="" />
// // //                 <span>{cat.name}</span>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* MAIN CONTENT */}
// // //       <div className="home-main">

// // //         {/* TOP BAR */}
// // //         <div className="top-info-row">
// // //           <div className="live-btn">LIVE</div>
// // //           <div className="live-date-box">{liveDate}</div>

// // //           <Link
// // //             to="/about"
// // //             style={{
// // //               padding: "4px 8px",
// // //               fontSize: "10px",
// // //               fontWeight: "700",
// // //               color: "#fff",
// // //               textDecoration: "none",
// // //               borderRadius: "8px",
// // //               background: "linear-gradient(135deg, #60fa7a, #0b7b29, #60fa7a)",
// // //               border: "1px solid rgba(255,255,255,0.3)",
// // //               boxShadow: "0 3px 0 #090b11, 0 4px 10px rgba(0,0,0,0.2)",
// // //             }}
// // //           >
// // //             See Price Graph
// // //           </Link>
// // //         </div>

// // //         {/* SEARCH */}
// // //         <div className="search-container">
// // //           <input
// // //             type="text"
// // //             placeholder="Search products..."
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //           />
// // //         </div>

// // //         {/* SUBCATEGORY DROPDOWN */}
// // //         {subList.length > 0 && (
// // //           <div className="sub-dropdown">
// // //             <select value={activeSub} onChange={(e) => setActiveSub(e.target.value)}>
// // //               <option value="all-sub">All Subcategories</option>
// // //               {subList.map((s) => (
// // //                 <option key={s._id} value={s._id}>
// // //                   {s.name}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         )}

// // //         {/* PRODUCT GRID */}
// // //         <div className="product-grid">
// // //           {filtered.map((item, i) => (
// // //             <div className="product-card" key={i}>
// // //               <img src={item.image} />

// // //               <h4>{item.name}</h4>

// // //               {/* ⭐ TIME CONTROLLED PRICE VISIBILITY ⭐ */}
// // //               {!isHiddenTime() ? (
// // //                 <>
// // //                   <p className="p-price">Today Price: ₹{item.currentFinalPrice}</p>

// // //                   <div className="p-bottom">
// // //                     <p
// // //                       className={`difference ${
// // //                         item.todayDiff >= 0 ? "positive" : "negative"
// // //                       }`}
// // //                     >
// // //                       TEJI/MANDI:{" "}
// // //                       {item.todayDiff >= 0
// // //                         ? `+₹${item.todayDiff}`
// // //                         : `₹${item.todayDiff}`}
// // //                     </p>
// // //                   </div>
// // //                 </>
// // //               ) : (
// // //                 <p
// // //                   className="p-price"
// // //                   style={{
// // //                     opacity: 0.3,
// // //                     fontSize: "12px",
// // //                     fontWeight: "600",
// // //                   }}
// // //                 >
// // //                   Price hidden (11 PM - 8 AM)
// // //                 </p>
// // //               )}

// // //               {/* GLOBAL DESCRIPTION */}
// // //               {item.globalDescription && (
// // //                 <p className="product-description">{item.globalDescription}</p>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useEffect, useState, useCallback } from "react";
// // import axios from "axios";
// // import "./Home.css";
// // import { Link } from "react-router-dom";

// // const PRICE_API = "https://grocerrybackend.vercel.app/api/prices/website";
// // const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";
// // const DESC_API = "https://grocerrybackend.vercel.app/api/descriptions";

// // export default function Home() {
// //   const [prices, setPrices] = useState([]);
// //   const [descriptions, setDescriptions] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   const [activeCategory, setActiveCategory] = useState("all");
// //   const [activeSub, setActiveSub] = useState("all-sub");
// //   const [subList, setSubList] = useState([]);

// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const [liveDate, setLiveDate] = useState("");

// //   const isHiddenTime = () => {
// //     const now = new Date();
// //     const hour = now.getHours();
// //     return hour >= 23 || hour < 8;
// //   };

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const priceRes = await axios.get(PRICE_API);
// //       const catRes = await axios.get(CATEGORY_API);
// //       const descRes = await axios.get(DESC_API);

// //       if (priceRes.data.success) {
// //         const activeOnly = priceRes.data.data.filter((p) => p.status === "active");
// //         setPrices(activeOnly);
// //       }

// //       if (descRes.data.success) setDescriptions(descRes.data.data);
// //       if (catRes.data.success)
// //         setCategories(catRes.data.categories || catRes.data.data || []);
// //     } catch (err) {
// //       console.error("Load error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       const now = new Date();
// //       const formatted =
// //         now.toLocaleDateString("en-IN", {
// //           day: "2-digit",
// //           month: "short",
// //           year: "numeric",
// //         }) +
// //         " | " +
// //         now.toLocaleTimeString("en-IN", {
// //           hour: "2-digit",
// //           minute: "2-digit",
// //           second: "2-digit",
// //         });

// //       setLiveDate(formatted);
// //     }, 1000);

// //     return () => clearInterval(timer);
// //   }, []);

// //   /* ============================================================
// //      ⭐ BACKEND PRICE LOGIC (lockedPrice, yesterdayLock)
// //   ============================================================ */
// //   const computePriceLogic = (item) => {
// //     const sale = Number(item.salePrice || 0);
// //     const locked = Number(item.lockedPrice || 0);
// //     const yesterday = Number(item.yesterdayLock || 0);

// //     // Today price = lockedPrice (fallback to salePrice)
// //     const todayPrice = locked > 0 ? locked : sale;

// //     // TEJI / MANDI Difference
// //     let diff = 0;
// //     if (yesterday === 0) diff = 0;
// //     else diff = todayPrice - yesterday;

// //     return {
// //       ...item,
// //       currentFinalPrice: todayPrice,
// //       todayDiff: diff,
// //     };
// //   };

// //   /* ============================================================
// //      MERGE DATA WITH PRICE LOGIC
// //   ============================================================ */
// //   const mergeData = useCallback(() => {
// //     const globalDescription = descriptions[0]?.description || "";

// //     return prices.map((item) => {
// //       const finalItem = computePriceLogic(item);
// //       return {
// //         ...finalItem,
// //         globalDescription,
// //       };
// //     });
// //   }, [prices, descriptions]);

// //   /* ============================================================
// //      FILTERING
// //   ============================================================ */
// //   useEffect(() => {
// //     let data = mergeData();

// //     // CATEGORY FILTER
// //     if (activeCategory !== "all") {
// //       data = data.filter((item) => {
// //         const catId =
// //           item.category?._id ||
// //           item.category ||
// //           null;

// //         return catId === activeCategory;
// //       });
// //     }

// //     // SUBCATEGORY FILTER
// //     if (activeSub !== "all-sub") {
// //       data = data.filter((item) => {
// //         const subId =
// //           item.subcategory?.id ||
// //           item.subcategory?._id ||
// //           item.subcategory ||
// //           null;

// //         return subId === activeSub;
// //       });
// //     }

// //     // SEARCH
// //     if (search.trim()) {
// //       data = data.filter((item) =>
// //         item.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     setFiltered(data);
// //   }, [activeCategory, activeSub, search, mergeData]);

// //   if (loading) {
// //     return (
// //       <div className="loader-wrapper">
// //         <h2 className="loader-title">Welcome to SG OVERSEAS</h2>
// //         <div className="loader-circle"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-layout">

// //       {/* SIDEBAR */}
// //       <div className="side-category">
// //         <div
// //           className={`side-cat-item all-item ${
// //             activeCategory === "all" ? "active" : ""
// //           }`}
// //           onClick={() => {
// //             setActiveCategory("all");
// //             setActiveSub("all-sub");
// //             setSubList([]);
// //           }}
// //         >
// //           <span>All</span>
// //         </div>

// //         {categories.map((cat) => {
// //           const subs = cat.subcategories || [];

// //           return (
// //             <div key={cat._id}>
// //               <div
// //                 className={`side-cat-item ${
// //                   activeCategory === cat._id ? "active" : ""
// //                 }`}
// //                 onClick={() => {
// //                   setActiveCategory(cat._id);
// //                   setActiveSub("all-sub");
// //                   setSubList(subs);
// //                 }}
// //               >
// //                 <img src={cat.image} alt="" />
// //                 <span>{cat.name}</span>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* MAIN CONTENT */}
// //       <div className="home-main">

// //         {/* TOP BAR */}
// //         <div className="top-info-row">
// //           <div className="live-btn">LIVE</div>
// //           <div className="live-date-box">{liveDate}</div>

// //           <Link
// //             to="/about"
// //             style={{
// //               padding: "4px 8px",
// //               fontSize: "10px",
// //               fontWeight: "700",
// //               color: "#fff",
// //               textDecoration: "none",
// //               borderRadius: "8px",
// //               background: "linear-gradient(135deg, #60fa7a, #0b7b29, #60fa7a)",
// //               border: "1px solid rgba(255,255,255,0.3)",
// //               boxShadow: "0 3px 0 #090b11, 0 4px 10px rgba(0,0,0,0.2)",
// //             }}
// //           >
// //             See Price Graph
// //           </Link>
// //         </div>

// //         {/* SEARCH */}
// //         <div className="search-container">
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* SUBCATEGORY DROPDOWN */}
// //         {subList.length > 0 && (
// //           <div className="sub-dropdown">
// //             <select value={activeSub} onChange={(e) => setActiveSub(e.target.value)}>
// //               <option value="all-sub">All Subcategories</option>
// //               {subList.map((s) => (
// //                 <option key={s._id} value={s._id}>
// //                   {s.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         )}

// //         {/* PRODUCT GRID */}
// //         <div className="product-grid">
// //           {filtered.map((item, i) => (
// //             <div className="product-card" key={i}>
// //               <img src={item.image} />

// //               <h4>{item.name}</h4>

// //               {!isHiddenTime() ? (
// //                 <>
// //                   <p className="p-price">Today Price: ₹{item.currentFinalPrice}</p>

// //                   <div className="p-bottom">
// //                     <p
// //                       className={`difference ${
// //                         item.todayDiff >= 0 ? "positive" : "negative"
// //                       }`}
// //                     >
// //                       TEJI/MANDI:{" "}
// //                       {item.todayDiff >= 0
// //                         ? `+₹${item.todayDiff}`
// //                         : `₹${item.todayDiff}`}
// //                     </p>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <p
// //                   className="p-price"
// //                   style={{ opacity: 0.3, fontSize: "12px", fontWeight: "600" }}
// //                 >
// //                   Price will be updated soon
// //                 </p>
// //               )}

// //               {item.globalDescription && (
// //                 <p className="product-description">{item.globalDescription}</p>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "./Home.css";
// import { Link } from "react-router-dom";

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

//   // Price hide between 11 PM – 8 AM
//   const isHiddenTime = () => {
//     const now = new Date();
//     const hour = now.getHours();
//     return hour >= 23 || hour < 8;
//   };

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

//   // Live time
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

//   /* ============================================================
//      ⭐ REAL BACKEND PRICE LOGIC (Admin panel se 100% match)
//      salePrice = basePrice + profitLoss
//      todayPrice  = salePrice           ← (your requirement)
//      teji/maddi = salePrice - lockedPrice   ← backend exact
//   ============================================================ */
//   const computePriceLogic = (item) => {
//     const sale = Number(item.salePrice || 0);
//     const locked = Number(item.lockedPrice || 0);

//     // ⭐ Today Price = SALE PRICE (Your requirement)
//     const todayPrice = sale;

//     // ⭐ ADMIN PANEL EXACT TEJI/MANDI CALCULATION
//     const diff = sale - locked;

//     return {
//       ...item,
//       currentFinalPrice: todayPrice,
//       todayDiff: diff,
//     };
//   };

//   /* ============================================================
//        ADD Description + price calculation
//   ============================================================ */
//   const mergeData = useCallback(() => {
//     const globalDescription = descriptions[0]?.description || "";

//     return prices.map((item) => {
//       const calculated = computePriceLogic(item);
//       return {
//         ...calculated,
//         globalDescription,
//       };
//     });
//   }, [prices, descriptions]);

//   /* ============================================================
//        FILTER (Category + Subcategory + Search)
//   ============================================================ */
//   useEffect(() => {
//     let data = mergeData();

//     if (activeCategory !== "all") {
//       data = data.filter((item) => {
//         const catId =
//           item.category?._id ||
//           item.category ||
//           null;
//         return catId === activeCategory;
//       });
//     }

//     if (activeSub !== "all-sub") {
//       data = data.filter((item) => {
//         const subId =
//           item.subcategory?._id ||
//           item.subcategory?.id ||
//           item.subcategory ||
//           null;
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

//   if (loading) {
//     return (
//       <div className="loader-wrapper">
//         <h2 className="loader-title">Welcome to SG OVERSEAS</h2>
//         <div className="loader-circle"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-layout">

//       {/* SIDEBAR */}
//       <div className="side-category">
//         <div
//           className={`side-cat-item all-item ${
//             activeCategory === "all" ? "active" : ""
//           }`}
//           onClick={() => {
//             setActiveCategory("all");
//             setActiveSub("all-sub");
//             setSubList([]);
//           }}
//         >
//           <span>All</span>
//         </div>

//         {categories.map((cat) => {
//           const subs = cat.subcategories || [];

//           return (
//             <div key={cat._id}>
//               <div
//                 className={`side-cat-item ${
//                   activeCategory === cat._id ? "active" : ""
//                 }`}
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

//         {/* LIVE BAR */}
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

//         {/* SEARCH */}
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
//               <img src={item.image} />

//               <h4>{item.name}</h4>

//               {/* PRICE SHOW */}
//               {!isHiddenTime() ? (
//                 <>
//                   <p className="p-price">
//                     Today Price: ₹{item.currentFinalPrice}
//                   </p>

//                   <div className="p-bottom">
//                     <p
//                       className={`difference ${
//                         item.todayDiff >= 0 ? "positive" : "negative"
//                       }`}
//                     >
//                       TEJI/MANDI:{" "}
//                       {item.todayDiff >= 0
//                         ? `+₹${item.todayDiff}`
//                         : `₹${item.todayDiff}`}
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <p className="p-price" style={{ opacity: 0.3 }}>
//                   Price will be updated soon
//                 </p>
//               )}

//               {/* DESCRIPTION */}
//               {item.globalDescription && (
//                 <p className="product-description">{item.globalDescription}</p>
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

  // -------------------------
  // PRICE HIDE BETWEEN 11 PM – 8 AM
  // -------------------------
  const isHiddenTime = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 23 || hour < 8;
  };

  // -------------------------
  // LOAD INITIAL DATA
  // -------------------------
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

  // -------------------------
  // LIVE TIME CLOCK
  // -------------------------
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

  // -------------------------
  // NORMALIZE SUBCATEGORY
  // -------------------------
  const normalizeSubcategory = (sub) => {
    if (!sub) return null;
    if (typeof sub === "string") return { _id: sub };
    return sub;
  };

  /* ============================================================
     ⭐ FIXED PRICE LOGIC + NEW PRODUCT MIDNIGHT LOGIC ⭐
  ============================================================ */
  const computePriceLogic = (item) => {
    const base = Number(item.basePrice ?? 0);
    const pl = Number(item.profitLoss ?? 0);

    const sale = Number(item.salePrice ?? base + pl);
    const locked = Number(item.lockedPrice ?? 0);

    const createdAt = new Date(item.createdAt);
    const now = new Date();

    // WAS PRODUCT CREATED TODAY?
    const isCreatedToday =
      createdAt.getFullYear() === now.getFullYear() &&
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getDate() === now.getDate();

    let tejiMandi;

    if (isCreatedToday) {
      tejiMandi = 0; // ⭐ NEW PRODUCT → SHOW ZERO UNTIL MIDNIGHT
    } else {
      tejiMandi = sale - locked; // Normal Teji/Mandi
    }

    return {
      ...item,
      salePrice: sale,
      lockedPrice: locked,
      currentFinalPrice: sale,
      todayDiff: tejiMandi,
    };
  };

  /* ============================================================
     MERGE PRICE + DESCRIPTION + CLEAN SUBCATEGORY
  ============================================================ */
  const mergeData = useCallback(() => {
    const globalDescription = descriptions[0]?.description || "";

    return prices.map((item) => {
      const normalizedSub = normalizeSubcategory(item.subcategory);
      const calc = computePriceLogic(item);

      return {
        ...calc,
        subcategory: normalizedSub,
        globalDescription,
      };
    });
  }, [prices, descriptions]);

  /* ============================================================
      APPLY FILTERS
  ============================================================ */
  useEffect(() => {
    let data = mergeData();

    // CATEGORY FILTER
    if (activeCategory !== "all") {
      data = data.filter((item) => {
        const catId = item.category?._id || item.category || null;
        return catId === activeCategory;
      });
    }

    // SUBCATEGORY FILTER
    if (activeSub !== "all-sub") {
      data = data.filter((item) => {
        const subId = item.subcategory?._id || item.subcategory || null;
        return subId === activeSub;
      });
    }

    // SEARCH FILTER
    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, activeSub, search, mergeData]);

  // -------------------------
  // LOADING SCREEN
  // -------------------------
  if (loading) {
    return (
      <div className="loader-wrapper">
        <h2 className="loader-title">Welcome to SG OVERSEAS</h2>
        <div className="loader-circle"></div>
      </div>
    );
  }

  // -------------------------
  // MAIN UI
  // -------------------------
  return (
    <div className="home-layout">
      
      {/* SIDEBAR */}
      <div className="side-category">
        <div
          className={`side-cat-item all-item ${
            activeCategory === "all" ? "active" : ""
          }`}
          onClick={() => {
            setActiveCategory("all");
            setActiveSub("all-sub");
            setSubList([]);
          }}
        >
          <span>All</span>
        </div>

        {categories.map((cat) => {
          const subs = cat.subcategories || [];

          return (
            <div key={cat._id}>
              <div
                className={`side-cat-item ${
                  activeCategory === cat._id ? "active" : ""
                }`}
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

        {/* LIVE TOP BAR */}
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
            <select
              value={activeSub}
              onChange={(e) => setActiveSub(e.target.value)}
            >
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
              <img src={item.image} alt="" />

              <h4>{item.name}</h4>

              {/* PRICE SHOW */}
              {!isHiddenTime() ? (
                <>
                  <p className="p-price">
                    Today Price: ₹{item.currentFinalPrice}
                  </p>

                  <div className="p-bottom">
                    <p
                      className={`difference ${
                        item.todayDiff >= 0 ? "positive" : "negative"
                      }`}
                    >
                      TEJI/MANDI:{" "}
                      {item.todayDiff >= 0
                        ? `+₹${item.todayDiff}`
                        : `₹${item.todayDiff}`}
                    </p>
                  </div>
                </>
              ) : (
                <p className="p-price" style={{ opacity: 0.3 }}>
                  Price will be updated soon
                </p>
              )}

              {/* DESCRIPTION */}
              {item.globalDescription && (
                <p className="product-description">{item.globalDescription}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

