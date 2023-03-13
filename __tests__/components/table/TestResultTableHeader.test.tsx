import TestResultTableHeader from '../../../components/table/TestResultTableHeader';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for TestResultTableHeader component:', () => {
  const STATUS_LABEL_TEST_ID = 'header-status-label';
  const CATEGORY_LABEL_TEST_ID = 'header-category-label';
  const NAME_LABEL_TEST_ID = 'header-name-label';

  it('should render the TestResultTableHeader component and match snapshot', () => {
    const { container } = render(<TestResultTableHeader />);

    expect(container).toMatchSnapshot();
  });

  it('should have proper labels', () => {
    const { getByTestId } = render(<TestResultTableHeader />);

    expect(getByTestId(STATUS_LABEL_TEST_ID)).toHaveTextContent('Status');
    expect(getByTestId(CATEGORY_LABEL_TEST_ID)).toHaveTextContent('Category');
    expect(getByTestId(NAME_LABEL_TEST_ID)).toHaveTextContent('Name');
  });
});
