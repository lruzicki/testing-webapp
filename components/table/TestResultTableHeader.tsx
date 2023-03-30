import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

const TestResultTableHeader = () => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div className='test-table-header'>
      <div data-testid='header-status-label'>
        <p>{format('test_table.status.label')}</p>
      </div>
      <div data-testid='header-category-label'>
        <p>{format('test_table.category.label')}</p>
      </div>
      <div data-testid='header-name-label'>
        <p>{format('test_table.name.label')}</p>
      </div>
    </div>
  );
};

export default TestResultTableHeader;
