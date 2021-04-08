import React from 'react';
import './AuthTemplate.scss';

function AuthTemplate({children}) {
  return (
    <div className={"auth-template"}>
      <div className={"white-box"}>
        {children}
      </div>
    </div>
  );
}

export default AuthTemplate;
