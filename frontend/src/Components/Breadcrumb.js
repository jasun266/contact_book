import React from 'react';

function Breadcrumb({ page }) {
  return <div>
      <h5>Dashboard {'>'} {page}</h5>
  </div>;
}

export default Breadcrumb;
