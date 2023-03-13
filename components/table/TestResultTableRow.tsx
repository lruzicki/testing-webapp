import React from 'react';

const TestResultTableRow = () => {
  return (
    <div className='test-table-row'>
      {/* add classnames */}
      <div className='test-table-row-status status-failed'>
        <p>Failed</p>
      </div>
      <div className='test-table-row-category'>PATCH</div>
      <div data-testid='product-last-update'>
        <p className='product-last-update'>/data/registry</p>
      </div>
    </div>
  );
};

export default TestResultTableRow;
