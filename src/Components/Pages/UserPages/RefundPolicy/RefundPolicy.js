import React from 'react';
import './RefundPolicy.css';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-container">
      <h1 className="refund-policy-title">REFUND POLICY</h1>
      <p className="refund-policy-text">
        All sales are final. There are NO refunds on food products.
      </p>
      <p className="refund-policy-text">
        You can always contact us for any return question at{' '}
        <a href="https://mail.google.com/mail/u/0/?pli=1#inbox?" className="refund-policy-email">
          support@tiffinviffin.com
        </a>.
      </p>
    </div>
  );
};

export default RefundPolicy;
