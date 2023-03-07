import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import TestSummary from '../../components/TestSummary';

const TestResultPage = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );
  const {
    buildingBlock,
    compatibility,
    id,
    productName,
    testsFailed,
    testsPassed,
  } = router.query;
  const handleBackToProductsList = () => {
    router.push('/');
  };

  return (
    <main>
      <div className='test-result-page'>
        <button
          className='back-to-home-page-btn'
          onClick={handleBackToProductsList}
        >
          {format('result_page.back_to_product_list')}
        </button>
        <div className='test-result-title'>
          <p>{format('result_page.title')}</p>
          <FaQuoteLeft className='quote' />
          <p>{router.query.productName}</p>
          <FaQuoteRight className='quote' />
        </div>
        {/* @ts-ignore */}
        <TestSummary xx={router.query} />
      </div>
    </main>
  );
};

export default TestResultPage;
