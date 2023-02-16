import ProductTableRow from '../../../components/table/ProductTableRow';
import { render } from '../../test-utils/test-utils';
import { productsList } from './mockedData/ProductTable';

describe('Unit tests for ProductTableRow component:', () => {
  it('should render the ProductTableRow component and match snapshot', () => {
    const { container } = render(<ProductTableRow product={productsList}/>);

    expect(container).toMatchSnapshot();
  });
});
