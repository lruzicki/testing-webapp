import ProductTableHeader from '../../../components/table/ProductTableHeader';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for ProductTableHeader component:', () => {
  it('should render the ProductTableHeader component and match snapshot', () => {
    const { container } = render(<ProductTableHeader />);

    expect(container).toMatchSnapshot();
  });
});
