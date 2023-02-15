import ProductTable from '../../../components/table/ProductTable';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for ProductTable component:', () => {
  it('should render the ProductTable component and match snapshot', () => {
    const { container } = render(<ProductTable />);

    expect(container).toMatchSnapshot();
  });
});
