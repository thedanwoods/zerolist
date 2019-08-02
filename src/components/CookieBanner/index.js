import React, { useState } from 'react';
import JSCookie from 'js-cookie';

import './cookie-banner.css';

function hasSeenCookie() {
  return JSCookie.get('has_seen_cookie_message') === 'true';
}
function setSeenCookies() {
  JSCookie.set('has_seen_cookie_message', 'true', { expires: 365 });
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(!hasSeenCookie());
  const setSeenMessage = () => {
    setSeenCookies();
    setVisible(false);
  };

  return (
    visible && (
      <div className="cookie-banner">
        <div className="cookie-banner__banner">
          <p className="cookie-banner__info">
            This site uses cookies. By using this site, you consent to cookies.
          </p>
          <div className="cookie-banner__buttons">
            <button className="cookie-banner__button" onClick={setSeenMessage}>
              Hide
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
