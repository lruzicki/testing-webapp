import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { BuildingBlockType } from '../service/types';
import BBImage from './table/BuildingBlocksImage';

type Props = {
  bbSummary: BuildingBlockType | undefined;
};

const TestSummary = ({ bbSummary }: Props) => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div
      className='test-summary-component'
      data-testid='test-summary-component'
    >
      {!bbSummary ? (
        <p>{format('app.error_fetching_data.message')}</p>
      ) : (
        <>
          <div className='test-summary-row test-summary-header'>
            <div data-testid='test-summary-bb-header'>{`${format('building_block.label')}:`}</div>
            <div data-testid='test-summary-passed-header'>{`${format('app.tests_passed.label')}:`}</div>
            <div data-testid='test-summary-failed-header'>{`${format('app.tests_failed.label')}:`}</div>
            <div data-testid='test-summary-compatibility-header'>{`${format('app.compatibility.label')}:`}</div>
          </div>
          <div className='test-summary-row test-summary-label'>
            <div
              className='test-summary-bb'
              data-testid='test-summary-bb-label'
            >
              <BBImage
                imagePath={bbSummary.buildingBlock as string}
                customStyle='test-summary-icon'
              />
              <p>{format(bbSummary.buildingBlock)}</p>
            </div>
            <div data-testid='test-summary-passed-label'>
              {bbSummary.testsPassed}
            </div>
            <div data-testid='test-summary-failed-label'>
              {bbSummary.testsFailed}
            </div>
            <div data-testid='test-summary-compatibility-label'>
              {`${Math.floor(bbSummary.compatibility * 100)}%`}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestSummary;
