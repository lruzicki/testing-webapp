import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
} from 'react-icons/ri';
import classNames from 'classnames';
import { ColumnSortType, SortFieldType, TableSortByType } from './types';

type Props = {
  handleSorting: (tableSortProperties: TableSortByType) => void;
};

const ProductTableHeader = ({ handleSorting }: Props) => {
  const [softwareSort, setSoftwareSort] = useState<ColumnSortType>({ field: 'software',order: null });
  const [dateSort, setDateSort] = useState<ColumnSortType>({ field: 'date', order: null });
  const [compatibilitySort, setCompatibilitySort] = useState<ColumnSortType>({ field: 'compatibility', order: null });

  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  useEffect(() => {
    handleSorting({ software: softwareSort, date: dateSort, compatibility: compatibilitySort });
  }, [softwareSort, dateSort, compatibilitySort]);

  const handleSortingChange = (field: SortFieldType) => {
    if (field === 'software') {
      setSoftwareSort({
        field: 'software',
        order: softwareSort.order === 'asc' ? 'desc' : (softwareSort.order === 'desc' ? null : 'asc'),
      });
    } else if (field === 'date') {
      setDateSort({
        field: 'date',
        order: dateSort.order === 'asc' ? 'desc' : (dateSort.order === 'desc' ? null : 'asc'),
      });
    } else if (field === 'compatibility') {
      setCompatibilitySort({
        field: 'compatibility',
        order: compatibilitySort.order === 'asc' ? 'desc' : (compatibilitySort.order === 'desc' ? null : 'asc'),
      });
    }
  };

  return (
    <div className='product-table-header'>
      <div></div>
      <div
        onClick={() => handleSortingChange('software')}
        data-testid='header-sort-software'
        className='cursor-pointer'
      >
        <p>{format('software_name.label')}</p>
        <div className='sort-icon'>
          <RiArrowUpSFill
            className={classNames('sort-icon-up', { 'sort-icon-active': softwareSort.order === 'asc' })}
          />
          <RiArrowDownSFill
            className={classNames('sort-icon-down', { 'sort-icon-active': softwareSort.order === 'desc' })}
          />
        </div>
      </div>
      <div>
        <p>{format('building_block.plural.label')}</p>
      </div>
      <div
        onClick={() => handleSortingChange('date')}
        data-testid='header-sort-update'
        className='cursor-pointer'
      >
        <p>{format('table.last_update.label')}</p>
        <div className='sort-icon'>
          <RiArrowUpSFill
            className={classNames('sort-icon-up', { 'sort-icon-active': dateSort.order === 'asc' })}
          />
          <RiArrowDownSFill
            className={classNames('sort-icon-down', { 'sort-icon-active': dateSort.order === 'desc' })}
          />
        </div>
      </div>
      <div
        onClick={() => handleSortingChange('compatibility')}
        data-testid='header-sort-compatibility'
        className='cursor-pointer'
      >
        <p>{format('table.overall_compatibility.label')}</p>
        <div className='sort-icon'>
          <RiArrowUpSFill
            className={classNames('sort-icon-up', { 'sort-icon-active': compatibilitySort.order === 'asc' })}
          />
          <RiArrowDownSFill
            className={classNames('sort-icon-down', { 'sort-icon-active': compatibilitySort.order === 'desc' })}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductTableHeader;
