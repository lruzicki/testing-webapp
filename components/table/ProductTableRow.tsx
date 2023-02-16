import React from 'react';
import { ProductsType } from '../../service/types';

type Props = {
  product: ProductsType;
};

const ProductTableRow = ({ product }: Props) => (
  <div className='product-table-row'>
    <div className='details-arrow'></div>
    <div className='product-table-content'>
      <div>
        <p>{product._id.testApp}</p>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  </div>
);

export default ProductTableRow;
