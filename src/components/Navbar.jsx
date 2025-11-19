
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">

//         {/* Logo */}
//         <Link to="/" className="logo">
//           <span>Grocerry</span>
//         </Link>

//         {/* Right Side Menu */}
//         <ul className="nav-menu no-hamburger">
//           <li>
//             <Link to="/about">Analytics</Link>
//           </li>
//         </ul>

//       </div>
//     </nav>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <span>Grocerry</span>
        </Link>

        {/* Right Side Menu */}
        <ul className="nav-menu no-hamburger">
          <li>
            <Link to="/about" className="graph-link">
              
              {/* 📊 GRAPH ICON — Always visible */}
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="graph-svg"
              >
                <path d="M3 3v18h18" />
                <rect x="7" y="12" width="3" height="6" />
                <rect x="12" y="9" width="3" height="9" />
                <rect x="17" y="5" width="3" height="13" />
              </svg>

              
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

