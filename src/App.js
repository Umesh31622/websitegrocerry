import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Main />
        </main>
        // <Footer />
      </div>
    </Router>
  );
}

export default App;
