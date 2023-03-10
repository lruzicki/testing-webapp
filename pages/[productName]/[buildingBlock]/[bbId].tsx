import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Link from 'next/link';
import TestSummary from '../../../components/TestSummary';

const TestResultPage = () => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  const { productName } = router.query;

  return (
    <main>
      <div className='test-result-page'>
        <Link
          className='back-to-home-page-btn'
          href={'/'}
          data-testid='test-result-page-link'
        >
          {format('result_page.back_to_product_list')}
        </Link>
        <div className='test-result-title' data-testid='test-result-page-title'>
          <p>{format('result_page.title')}</p>
          <FaQuoteLeft className='quote' />
          <p>{productName}</p>
          <FaQuoteRight className='quote' />
        </div>
        <TestSummary />
      </div>
    </main>
  );
};

export default TestResultPage;
