import { render } from '../test-utils/test-utils';
import TestSummary from '../../components/TestSummary';

describe('Unit tests for TestSummary component:', () => {
  const BB_HEADER_TEST_ID = 'test-summary-bb-header';
  const PASSED_TEST_HEADER_TEST_ID = 'test-summary-passed-header';
  const FAILED_TEST_HEADER_TEST_ID = 'test-summary-failed-header';
  const COMPATIBILITY_HEADER_TEST_ID = 'test-summary-compatibility-header';
  const BB_LABEL_TEST_ID = 'test-summary-bb-label';
  const PASSED_TEST_LABEL_TEST_ID = 'test-summary-passed-label';
  const FAILED_TEST_LABEL_TEST_ID = 'test-summary-failed-label';
  const COMPATIBILITY_LABEL_TEST_ID = 'test-summary-compatibility-label';

  it('should render the component and match snapshot', () => {
    const { container } = render(<TestSummary />);

    expect(container).toMatchSnapshot();
  });

  it('should have corresponding values', () => {
    const { getByTestId } = render(<TestSummary />);

    expect(getByTestId(BB_HEADER_TEST_ID)).toHaveTextContent('Building Block');
    expect(getByTestId(PASSED_TEST_HEADER_TEST_ID)).toHaveTextContent('Tests Passed');
    expect(getByTestId(FAILED_TEST_HEADER_TEST_ID)).toHaveTextContent('Tests Failed');
    expect(getByTestId(COMPATIBILITY_HEADER_TEST_ID)).toHaveTextContent('Compatibility');
    // expect(getByTestId(BB_LABEL_TEST_ID)).toHaveTextContent('mobility_management');
    // expect(getByTestId(PASSED_TEST_LABEL_TEST_ID)).toHaveTextContent('2');
    // expect(getByTestId(FAILED_TEST_LABEL_TEST_ID)).toHaveTextContent('2');
    // expect(getByTestId(COMPATIBILITY_LABEL_TEST_ID)).toHaveTextContent('34%');
  });
});
