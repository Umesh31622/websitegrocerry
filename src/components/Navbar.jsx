// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">

//         {/* Logo */}
//         <Link to="/" className="logo">
//           <span>Food Helper</span>
//         </Link>

        

//       </div>
//     </nav>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MapPin, Phone } from "lucide-react"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT - Logo */}
        <Link to="/" className="logo">
          <span>SG OVERSEAS</span>
        </Link>

        {/* RIGHT - Address + Mobile */}
        <div className="nav-right">
          
          <div className="nav-info">
            <MapPin size={18} className="nav-icon" />
            <span>Chhawani, Indore</span>
          </div>

          {/* <div className="nav-info">
            <Phone size={18} className="nav-icon" />
            <span>9826913258</span>
          </div> */}
                 <a
  href="https://wa.me/9826913258"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-info"
  style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", color: "inherit" }}
>
  <Phone size={18} className="nav-icon" />
  <span style={{ color: " #059669" }}>9826913258</span>
</a>

        </div>

      </div>
    </nav>
  );
}



