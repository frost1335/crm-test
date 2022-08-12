import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-box">
          <div className="footer-text">
            <p>
              <i className="fal fa-user-cog" />
              Texnik yordam
            </p>
            <p>
              <i className="fal fa-info-circle" />
              Hujjatlar
            </p>
          </div>
          <div className="footer-icon">Change IT academy</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
