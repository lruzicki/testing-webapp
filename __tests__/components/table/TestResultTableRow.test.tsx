import React from 'react';
import TestResultTableRow from '../../../components/table/TestResultTableRow';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for TestResultTableRow component:', () => {
  it('should render the TestResultTableRow component and match snapshot', () => {
    const { container } = render(
      <TestResultTableRow />
    );

    expect(container).toMatchSnapshot();
  });
});
