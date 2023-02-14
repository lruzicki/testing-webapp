import TableHeader from '../../../components/table/TableHeader';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for TableHeader component:', () => {
  it('should render the TableHeader component and match snapshot', () => {
    const { container } = render(<TableHeader />);

    expect(container).toMatchSnapshot();
  });
});
