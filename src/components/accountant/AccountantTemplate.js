import React from 'react';
import './AccountantTemplate.scss';

// TODO refine package
function AccountantTemplate({children}) {
  return (
    <div className={"accountant-template"}>
      <div className={"white-box"}>
        {children}
      </div>
    </div>
  );
}

export default AccountantTemplate;
