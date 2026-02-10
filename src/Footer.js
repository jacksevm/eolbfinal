// Footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footercontainer">
        <p>
          &copy; {new Date().getFullYear()} CSTE/Proj/I/MAS - Southern Railway. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
