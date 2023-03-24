import classNames from 'classnames';
import React from 'react';
import { BuildingBlockEndpointTest } from '../../service/types';

type Props = {
  bbTest: BuildingBlockEndpointTest;
};

const TestResultTableRow = ({ bbTest }: Props) => (
  <div className='test-table-row'>
    {bbTest?.passed ? (
      <div className='test-table-row-status status-passed' data-testid='bb-test-passed'>
        <p>Passed</p>
      </div>
    ) : (
      <div className='test-table-row-status status-failed' data-testid='bb-test-failed'>
        <p>Failed</p>
      </div>
    )}
    <div
      className={classNames({ 'test-table-row-category': bbTest?.method !== '', })}
      data-testid='bb-test-category'>{bbTest?.method === '' ? '-' : bbTest?.method}
    </div>
    <div data-testid='bb-test-endpoint'>
      <p>{bbTest?.endpoint === '' ?  '-' : bbTest?.endpoint}</p>
    </div>
  </div>
);

export default TestResultTableRow;
