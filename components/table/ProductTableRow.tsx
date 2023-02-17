import React, { createRef, useEffect, useState } from 'react';
import { ProductsType } from '../../service/types';
import BBImage from './BuildingBlocksImage';

type Props = {
  product: ProductsType;
};

const ProductTableRow = ({ product }: Props) => {
  const bbImageContainer = createRef<HTMLDivElement>();
  const [bbImageOverflow, setBBImageOverflow] = useState(false);

  useEffect(() => {
    const bbImg = bbImageContainer.current;

    if (bbImg) {
      const productOverflow =
        bbImg.offsetHeight < bbImg.scrollHeight || bbImg.offsetWidth < bbImg.scrollWidth;
      setBBImageOverflow(productOverflow);
    }
  }, [bbImageOverflow, bbImageContainer]);

  return (
    <div className='product-table-row'>
      <div className='details-arrow'></div>
      <div className='product-table-content'>
        <div>
          <p>{product._id.testApp}</p>
        </div>
        <div className='table-bb-section'>
          <div className='table-bb-image' ref={bbImageContainer}>
            {product.compatibilities.map((bb, bbIdx) => (
              <BBImage imagePath={bb.buildingBlock} key={`bb-image-${bbIdx}`} />
            ))}
          </div>
          <div>
            {bbImageOverflow && (
              <div className='overflow-count'>
                <p>+3</p>
              </div>
            )}
          </div>
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
};

export default ProductTableRow;
