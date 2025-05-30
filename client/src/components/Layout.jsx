import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav className="layout-nav">
        <Link to="/" className="layout-logo">TrainUP</Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="layout-menu-button">
          ☰
        </button>
        {menuOpen && (
          <div className="layout-menu">
            <Link to="/add-exam" className="layout-menu-item" onClick={() => setMenuOpen(false)}>Add Exam</Link>
            <Link to="/add-exercise" className="layout-menu-item" onClick={() => setMenuOpen(false)}>Add Exercise</Link>
          </div>
        )}
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;