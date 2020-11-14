import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../Style/Footer.css";
function Footer() {
  return (
    <div>
      <div className="footer">
        <a className="" href="https://github.com/rit-hub">
          <GitHubIcon className="github__logo" />
        </a>
        <h3>Created by Ritam Charan</h3>
        <p>
          <strong>Made Using React & Firebase</strong>
        </p>
        <p>
          <b>Note:</b> This Whatsapp web clone was created only
          to learn & show my skills in creating web applications and will never
          be used for commercial purposes.
        </p>
      </div>
    </div>
  );
}

export default Footer;
