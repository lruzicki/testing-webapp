import { render } from '../../test-utils/test-utils';
import TestResultTable from '../../../components/table/TestResultTable';

describe('Unit tests for TestResultTable component:', () => {
  it('should match snapshot', () => {
    const { container } = render(<TestResultTable />);

    expect(container).toMatchSnapshot();
  });
});
