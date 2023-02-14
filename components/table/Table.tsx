import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = () => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div className='table'>
      <div className='table-results-count'>
        <p>{format('table.result.plural.label')}</p>
      </div>
      <div className='table-body'>
        <TableHeader />
        <TableRow />
      </div>
    </div>
  );
};

export default Table;
