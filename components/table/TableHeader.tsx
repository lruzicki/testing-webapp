import React, { useCallback } from 'react';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

const TableHeader = () => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string) => formatMessage({ id }),
    [formatMessage]
  );

  return (
    <div className='product-table-header'>
      <div className='empty-space'></div>
      <div className='product-table-sections'>
        <div>
          <p>{format('product_name.label')}</p>
          <RiArrowUpDownLine className='icon-sort' />
        </div>
        <div>
          <p>{format('building_block.plural.label')}</p>
        </div>
        <div>
          <p>{format('table.last_update.label')}</p>
          <RiArrowUpDownLine className='icon-sort' />
        </div>
        <div>
          <p>{format('table.overall_compatibility.label')}</p>
          <RiArrowUpDownLine className='icon-sort' />
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
