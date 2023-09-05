import classNames from 'classnames';
import React from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  customStyle?: string;
  isOpen?: boolean;
};

const TextTooltip = ({ customStyle, isOpen }: Props) => {
  // State to control tooltip visibility

  return (
    <div
      className='text-tooltip'
    >
      <Tooltip
        id='text-tooltip'
        className={classNames('text-tooltip-body', customStyle)}
        // closeOnScroll is part of V5 API, types 4.x.x don't include this parameter
        // @ts-ignore
        closeOnScroll={true}
        hidden={isOpen}
      />
    </div>
  );
};

export default TextTooltip;
