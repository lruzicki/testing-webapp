import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';

const ProductTable = () => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div className='table'>
      <div className='table-results-count'>
        <p>0{format('table.result.plural.label')}</p>
      </div>
      <div className='table-body'>
        <ProductTableHeader />
        <ProductTableRow />
      </div>
    </div>
  );
};

export default ProductTable;
