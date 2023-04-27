import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getSoftwaresData, getSoftwareListCount } from '../../service/serviceAPI';
import { ProductsType } from '../../service/types';
import InfiniteScrollCustomLoader from '../InfiniteScrollLoader';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';
import TableErrorHandling from './TableErrorHandling';
import { SoftwaresTableSortByType } from './types';

const ProductTable = () => {
  const [productsList, setProductsList] = useState<ProductsType[]>([]);
  const [productListLength, setProductListLength] = useState<number>(0);
  const [isErrorFetchingData, setIsErrorFetchingData] = useState<boolean>(false);
  const [isErrorFetchingCount, setIsErrorFetchingCount] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SoftwaresTableSortByType>({
    testApp: { field: 'testApp', order: null },
    lastUpdate: { field: 'lastUpdate', order: null },
    overallCompatibility: { field: 'overallCompatibility', order: null }
  });

  console.log(sortBy);

  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  useEffect(() => {
    fetchData();
  }, [sortBy]);

  const fetchData = async () => {
    const [data, count] = await Promise.all([
      getSoftwaresData(0, sortBy),
      getSoftwareListCount(),
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
    const data = await getSoftwaresData(productsList.length, sortBy);

    if (data.status) {
      setProductsList([...productsList, ...data.data]);
    } else {
      setProductsList([...productsList]);
    }
  }, [productsList]);

  const handleSorting = (tableSortProperties: SoftwaresTableSortByType) => {
    setSortBy(tableSortProperties);
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
