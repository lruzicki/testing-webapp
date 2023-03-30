import classNames from 'classnames';
import React from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  customStyle?: string;
};

const TextTooltip = ({ customStyle }: Props) => (
  <div className='text-tooltip'>
    <Tooltip
      id='text-tooltip'
      className={classNames('text-tooltip-body', customStyle)}
    />
  </div>
);

export default TextTooltip;
