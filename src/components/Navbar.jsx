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

          <div className="nav-info">
            <Phone size={18} className="nav-icon" />
            <span>9826913258</span>
          </div>

        </div>

      </div>
    </nav>
  );
}


