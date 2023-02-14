import ProductTableRow from '../../../components/table/ProductTableRow';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for ProductTableRow component:', () => {
  it('should render the ProductTableRow component and match snapshot', () => {
    const { container } = render(<ProductTableRow />);

    expect(container).toMatchSnapshot();
  });
});
