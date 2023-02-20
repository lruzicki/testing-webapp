import React, { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { ProductsType } from '../../service/types';
import BBImage from './BuildingBlocksImage';

type Props = {
  product: ProductsType;
};

const ProductTableRow = ({ product }: Props) => {
  const bbImageContainer = React.useRef<HTMLDivElement | null>(null);
  const [numberOfHidenBBImages, setNumberOfHidenBBImages] = React.useState<Number | null>(null);

  const productCompatibilitiesLength = product.compatibilities.length;

  const getContainerSize = useCallback(() => {
    const container = bbImageContainer.current;
    if (container && productCompatibilitiesLength > 0) {
      const numberOfVisibleBBImageinContainer = productCompatibilitiesLength - Math.floor((container.clientWidth || 0) / 28);

      setNumberOfHidenBBImages(Math.max(0, numberOfVisibleBBImageinContainer));
    }
  }, [productCompatibilitiesLength]);

  useEffect(getContainerSize, [getContainerSize]);

  useEffect(
    () => window.addEventListener('resize', debounce(getContainerSize, 100)),
    [getContainerSize]
  );

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
              <BBImage
                imagePath={bb.buildingBlock}
                key={`bb-image-${bbIdx}`}
              />
            ))}
          </div>
          <div>
            {numberOfHidenBBImages ? (
              <div className='overflow-count' data-testid='bb-rest-count'>
                <p>{`+${numberOfHidenBBImages}`}</p>
              </div>
            ): null}
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
