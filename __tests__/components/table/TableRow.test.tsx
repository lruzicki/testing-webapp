import TableRow from '../../../components/table/TableRow';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for TableRow component:', () => {
  it('should render the TableRow component and match snapshot', () => {
    const { container } = render(<TableRow />);

    expect(container).toMatchSnapshot();
  });
});
