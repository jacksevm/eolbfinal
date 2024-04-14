import React from "react";
import "./Header.css"; // Import your CSS file

const Header = () => {
  const location = window.location.pathname;

  return (
    <header id="site-header" className="header">
      <div id="header-wrap">
        <div className="container">
          <div className="row">
            <div className="col">
              <nav className="navbar navbar-expand-lg">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mx-auto position-relative">
                    {/* Home link */}
                    <li className="nav-item">
                      <a
                        href="/"
                        className={`${
                          location === "/" ? "nav-link active" : "nav-link"
                        }`}
                      >
                        Home
                      </a>
                    </li>

                    {/* EOLB Status */}
                    <li className="nav-item">
                      <a
                        href="/eolb"
                        className={`${
                          location === "/eolb"
                            ? "nav-link active"
                            : "nav-link"
                        }`}
                      >
                        EOLB Status
                      </a>
                    </li>

                  
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
