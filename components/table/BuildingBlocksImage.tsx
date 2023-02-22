import Image from 'next/image';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

type Props = {
  imagePath: string;
};

const BBImage = ({ imagePath }: Props) => {
  const { formatMessage } = useIntl();
  const format = useCallback(
    (id: string, values: object) => formatMessage({ id }, { ...values }),
    [formatMessage]
  );

  return (
    <Image
      className='bb-image'
      src={`/images/buildingBlocks/${imagePath}.png`}
      alt={format('image.alt.logoFor', { name: imagePath })}
      width={18}
      height={18}
    />
  );
};

export default BBImage;
