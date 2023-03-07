import { GetServerSideProps, GetStaticProps, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import BBImage from './table/BuildingBlocksImage';

type Props = {
  bbId: string;
  buildingBlock: string;
  compatibility: number;
  id: string;
  productName: string;
  saveTime: number;
  testsFailed: number;
  testsPassed: number;
  timestamp: number;
};

const TestSummary = () => {
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div className='test-summary-component'>
      <div className='test-summary-row test-summary-header'>
        <div>{`${format('building_block.label')}:`}</div>
        <div>{`${format('app.tests_passed.label')}:`}</div>
        <div>{`${format('app.tests_failed.label')}:`}</div>
        <div>{`${format('app.compatibility.label')}:`}</div>
      </div>
      {/* <div className='test-summary-row test-summary-label'>
        <div className='test-summary-bb'>
          <BBImage */}
      // @ts-ignore
      {/* imagePath={buildingBlock}
            customStyle='test-summary-icon'
          />
          <p>{buildingBlock}</p>
        </div>
        <div>{testsPassed}</div>
        <div>{testsFailed}</div> */}
      {/* @ts-ignore */}
      {/* <div>{`${Math.floor(compatibility * 100)}%`}</div> */}
      {/* </div> */}
    </div>
  );
};

export default TestSummary;
