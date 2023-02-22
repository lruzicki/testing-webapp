import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { ProductsType } from '../../service/types';
import BBImage from './BuildingBlocksImage';

type Props = {
  product: ProductsType;
};

const ProductTableRow = ({ product }: Props) => {
  const bbContentContainer = React.useRef<HTMLDivElement | null>(null);
  const [numberOfHidenBBImages, setNumberOfHidenBBImages] = useState<Number | null>(null);
  const [imageSectionWidth, setImageSectionWidth] = useState<string | undefined>();

  const productCompatibilitiesLength = product.compatibilities.length;

  const getContainerSize = useCallback(() => {
    const bbContainer = bbContentContainer.current;
    if (productCompatibilitiesLength > 0 && bbContainer) {
      const bbImageWidth = bbContainer.clientWidth * 0.75;
      const numberOfVisibleBBImageinContainer = productCompatibilitiesLength - Math.floor((bbImageWidth || 0) / 28);

      setNumberOfHidenBBImages(Math.max(0, numberOfVisibleBBImageinContainer));
      setImageSectionWidth(`${bbImageWidth - (bbImageWidth % 28)}px`);
    }
  }, [productCompatibilitiesLength, bbContentContainer]);

  useEffect(getContainerSize, [getContainerSize]);

  useEffect(
    () => window.addEventListener('resize', debounce(getContainerSize, 20)),
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
          <div ref={bbContentContainer}>
            <div className='table-bb-image' style={{ width: imageSectionWidth ?? '75%' }}>
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
              ) : null}
            </div>
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
