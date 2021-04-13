import React from 'react';
import './PageTemplate.scss';

function PageTemplate({children}) {
  return (
    <div className={"page-template"}>
      {children}
    </div>
  );
}

export default PageTemplate;
