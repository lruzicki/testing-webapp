import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { SortFieldType, SortOrderType } from '../../service/types';

type Props = {
  handleSorting: (field: SortFieldType, order: SortOrderType) => void
}

const ProductTableHeader = ({ handleSorting }: Props) => {
  const [sortField, setSortField] = useState<SortFieldType>();
  const [order, setOrder] = useState<SortOrderType>();

  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  const handleSortingChange = (field: SortFieldType) => {
    const sortOrder = field === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setOrder(sortOrder);
    handleSorting(field, sortOrder);
  };

  return (
    <div className='product-table-header'>
      <div></div>
      <div onClick={() => handleSortingChange('software')} data-testid='header-sort-software'>
        <p>{format('software_name.label')}</p>
        <RiArrowUpDownLine className='sort-icon' />
      </div>
      <div>
        <p>{format('building_block.plural.label')}</p>
      </div>
      <div onClick={() => handleSortingChange('date')} data-testid='header-sort-update'>
        <p>{format('table.last_update.label')}</p>
        <RiArrowUpDownLine className='sort-icon' />
      </div>
      <div onClick={() => handleSortingChange('compatibility')} data-testid='header-sort-compatibility'>
        <p>{format('table.overall_compatibility.label')}</p>
        <RiArrowUpDownLine className='sort-icon' />
      </div>
      <div></div>
    </div>
  );
};

export default ProductTableHeader;
