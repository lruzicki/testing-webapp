import React from 'react';
import { BuildingBlockType } from '../../service/types';
import BBImage from './BuildingBlocksImage';

type Props = {
  buildingBlock: BuildingBlockType;
};

const SubTableRow = ({ buildingBlock }: Props) => {
  return (
    <div className='sub-table-row'>
      <div></div>
      <div className='sub-table-row-bb' data-testid='bb-name'>
        <BBImage imagePath={buildingBlock.buildingBlock} />
        <p>{(buildingBlock.buildingBlock).replace(/bb-|-/g, ' ')}</p>
      </div>
      <div className='sub-table-content-tests'>
        <div data-testid='tests-passed'>
          <p>{buildingBlock.testsPassed}</p>
        </div>
        <div data-testid='tests-failed'>
          <p>{buildingBlock.testsFailed}</p>
        </div>
      </div>
      <div
        className='sub-table-content-compatibility'
        data-testid='compatibility'
      >
        <p>{`${Math.floor(buildingBlock.compatibility * 100)}%`}</p>
      </div>
      <div className='test-details-arrow'></div>
    </div>
  );
};

export default SubTableRow;