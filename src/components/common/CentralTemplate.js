import React from 'react';
import './CentralTemplate.scss';

function CentralTemplate({children}) {
  return (
    <div className={"central-template"}>
      <div className={"white-box"}>
        {children}
      </div>
    </div>
  );
}

export default CentralTemplate;
