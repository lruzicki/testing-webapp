import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getData, getProductListCount } from '../../service/serviceAPI';
import { ProductsType, SortFieldType, SortOrderType } from '../../service/types';
import InfiniteScrollCustomLoader from '../InfiniteScrollLoader';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';
import TableErrorHandling from './TableErrorHandling';

const ProductTable = () => {
  const [productsList, setProductsList] = useState<ProductsType[]>([]);
  const [productListLength, setProductListLength] = useState<number>(0);
  const [isErrorFetchingData, setIsErrorFetchingData] = useState<boolean>(false);
  const [isErrorFetchingCount, setIsErrorFetchingCount] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<{ field: SortFieldType, order: SortOrderType }>();

  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [data, count] = await Promise.all([
      getData(0),
      getProductListCount(),
    ]);

    if (data.status) {
      setProductsList(data.data);
    } else {
      setIsErrorFetchingData(true);
    }

    if (count.status) {
      setProductListLength(count.data);
    } else {
      setIsErrorFetchingCount(true);
    }
  };

  const handleLoadMoreData = useCallback(async () => {
    const data = await getData(productsList.length);

    if (data.status) {
      setProductsList([...productsList, ...data.data]);
    } else {
      setProductsList([...productsList]);
    }
  }, [productsList]);

  const handleSorting = (sortField: SortFieldType, sortOrder: SortOrderType) => {
    setSortBy({ field: sortField, order: sortOrder });
  };

  return (
    <div className='table'>
      <div className='table-results-count'>
        <p>
          {isErrorFetchingCount ? format('table.no_result_count.message') : productListLength}
        </p>
        <p>
          {isErrorFetchingCount ? null : productListLength === 1
            ? format('table.result.label')
            : format('table.result.plural.label')}
        </p>
      </div>
      <div className='table-body'>
        <ProductTableHeader handleSorting={handleSorting}/>
        {isErrorFetchingData ? (
          <TableErrorHandling />
        ) : (
          <div id='scrollableDiv' className='product-table-row-section'>
            <InfiniteScroll
              scrollableTarget='scrollableDiv'
              dataLength={productsList?.length ?? 0}
              next={handleLoadMoreData}
              hasMore={
                isErrorFetchingData
                  ? false
                  : productListLength > productsList?.length
              }
              loader={<InfiniteScrollCustomLoader />}
              style={{ overflowX: 'hidden' }}
            >
              {productsList.map((product, key) => (
                <ProductTableRow product={product} key={`product-${key}`} />
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
