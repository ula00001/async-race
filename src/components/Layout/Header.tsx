import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-logo">
          <span className="logo-text">ASYNC</span>
          <span className="logo-accent">RACE</span>
        </div>
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            id="nav-garage"
          >
            Garage
          </NavLink>
          <NavLink
            to="/winners"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            id="nav-winners"
          >
            Winners
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
