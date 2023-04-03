import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { BuildingBlockEndpointTest, BuildingBlockTestSummary } from '../../service/types';
import TableErrorHandling from './TableErrorHandling';
import TestResultTableHeader from './TestResultTableHeader';
import TestResultTableRow from './TestResultTableRow';

type Props = {
  bbSummary: BuildingBlockTestSummary | undefined
  // eslint-disable-next-line no-unused-vars
  passCurrentBBTest: (value: BuildingBlockEndpointTest) => void
}

const TestResultTable = ({ bbSummary, passCurrentBBTest }: Props) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  const { locale } = router;

  return (
    <div className='test-table-container'>
      <div className='test-table-last-update' data-testid='test-table-last-update'>
        <p>{format('test_table.last_update.label')}</p>
        <p>{bbSummary ? new Date(bbSummary?.compatibilities.saveTime).toLocaleDateString(locale) : '-'}</p>
      </div>
      <div className='test-table-result' data-testid='test-table-result'>
        {!bbSummary?.count ? <p>{'-'}</p> : <p>{bbSummary.count}</p>}
        <p>
          {bbSummary?.count === 1
            ? format('table.result.label')
            : format('table.result.plural.label')}
        </p>
      </div>
      <div className='test-table-table'>
        <TestResultTableHeader />
        {!bbSummary?.data ? <TableErrorHandling /> : (
          <div className='test-table-row-container'>
            {bbSummary.data.map((bbTest, idx) =>
              <TestResultTableRow
                bbTest={bbTest}
                key={`bbTest-${idx}`}
                passCurrentBBTest={() => passCurrentBBTest(bbTest)}
              />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestResultTable;
