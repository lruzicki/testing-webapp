import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import TestResultTableHeader from './TestResultTableHeader';
import TestResultTableRow from './TestResultTableRow';

const TestResultTable = () => {
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  let resultLength = 23;

  return (
    <div className='test-table-container'>
      <div className='test-table-last-update'>
        <p>{format('test_table.last_update.label')}</p>
        <p>10/3/2222</p>
      </div>
      <div className='test-table-result'>
        <p>{resultLength}</p>
        <p>
          {resultLength === 1
            ? format('table.result.label')
            : format('table.result.plural.label')}
        </p>
      </div>
      <div>
        <TestResultTableHeader />
        <TestResultTableRow />
        <TestResultTableRow />
        <TestResultTableRow />
        <TestResultTableRow />
      </div>
    </div>
  );
};

export default TestResultTable;
