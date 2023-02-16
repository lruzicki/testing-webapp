import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { getProductsList } from '../../service/serviceAPI';
import { ProductsType } from '../../service/types';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';

const ProductTable = () => {
  const [productsList, setProductsList] = useState<ProductsType[]>([]);
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  useEffect(() => {
    const products = getProductsList();
    setProductsList(products);
  }, []);

  const productListLength = productsList.length;

  return (
    <div className='table'>
      <div className='table-results-count'>
        <p>
          {productListLength}
          {productListLength === 1
            ? format('table.result.label')
            : format('table.result.plural.label')}
        </p>
      </div>
      <div className='table-body'>
        <ProductTableHeader />
        <div className='product-table-row-section'>
          {productsList.map((product, key) => (
            <ProductTableRow product={product} key={`product-${key}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
