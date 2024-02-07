import React from 'react';

export const Modal = ({ children, submit, close }) => {
  return (
    <div className="sign-preview">
      <div className="sign-preview-overlay"></div>
      <div className="sign-preview-content">
        <div className="sign-preview-content-header">
          <h3>Preview Sign Document</h3>
          <button onClick={close} className="sign-preview-close">
            &#x2715;
          </button>
        </div>
        <div className="sign-preview-content-body">{children}</div>
        <div className="sign-preview-content-footer">
          <p>
            I understand and accept that my electronic signature will be as
            valid as a handwritten signature and considered original to the
            extent allowed by applicable law.
          </p>
          <button onClick={submit} className="btn">
            Sign Document
          </button>
        </div>
      </div>
    </div>
  );
};
