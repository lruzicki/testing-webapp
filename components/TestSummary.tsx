import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import BBImage from './table/BuildingBlocksImage';

const TestSummary = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  const { buildingBlock, bbId } = router.query;

  return (
    <div className='test-summary-component' data-testid='test-summary-component'>
      <div className='test-summary-row test-summary-header'>
        <div data-testid='test-summary-bb-header'>{`${format('building_block.label')}:`}</div>
        <div data-testid='test-summary-passed-header'>{`${format('app.tests_passed.label')}:`}</div>
        <div data-testid='test-summary-failed-header'>{`${format('app.tests_failed.label')}:`}</div>
        <div data-testid='test-summary-compatibility-header'>{`${format('app.compatibility.label')}:`}</div>
      </div>
      <div className='test-summary-row test-summary-label'>
        <div className='test-summary-bb' data-testid='test-summary-bb-label'>
          <BBImage
            // @ts-ignore
            imagePath={buildingBlock}
            customStyle='test-summary-icon'
          />
          <p>{buildingBlock}</p>
        </div>
        {/* <div data-testid='test-summary-passed-label'>{testsPassed}</div>
        <div data-testid='test-summary-failed-label'>{testsFailed}</div> */}
        {/* <div data-testid='test-summary-compatibility-label'>{`${Math.floor(compatibility * 100)}%`}</div> */}
      </div>
    </div>
  );
};

export default TestSummary;
