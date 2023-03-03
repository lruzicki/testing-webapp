import React from 'react';
import SubTableRow from '../../../components/table/SubTableRow';
import { render } from '../../test-utils/test-utils';
import { buildingBlock } from './mockedData/ProductTable';

describe('Unit tests for SubTableRow component:', () => {
  const BB_NAME_TEST_ID = 'bb-name';
  const TESTS_PASSED_TEST_ID = 'tests-passed';
  const TESTS_FAILED_TEST_ID = 'tests-failed';
  const COMPATIBILITY_TEST_ID = 'compatibility';

  it('should render the SubTableRow component and match snapshot', () => {
    const { container } = render(
      <SubTableRow buildingBlock={buildingBlock} />
    );

    expect(container).toMatchSnapshot();
  });

  it('when have corresponding values', () => {
    const { getByTestId } = render(
      <SubTableRow
        buildingBlock={buildingBlock}
      />
    );

    expect(getByTestId(BB_NAME_TEST_ID)).toHaveTextContent('mobility_management');
    expect(getByTestId(TESTS_PASSED_TEST_ID)).toHaveTextContent('2');
    expect(getByTestId(TESTS_FAILED_TEST_ID)).toHaveTextContent('2');
    expect(getByTestId(COMPATIBILITY_TEST_ID)).toHaveTextContent('34%');
  });
});
