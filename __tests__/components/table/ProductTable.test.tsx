import ProductTable from '../../../components/table/ProductTable';
import { render } from '../../test-utils/test-utils';
import * as Api from '../../../service/serviceAPI';
import { productsList } from './mockedData/ProductTable';

jest.mock('../../../service/serviceAPI', () => ({
  getProductsList: jest.fn(() => [])
}));

describe('Unit tests for ProductTable component:', () => {
  it('should render the ProductTable component and match snapshot', () => {
    const spyOnGetProductsList = jest.spyOn(Api, 'getProductsList').mockImplementationOnce(() => [productsList]);

    const { container } = render(<ProductTable />);

    expect(container).toMatchSnapshot();
    expect(spyOnGetProductsList).toHaveBeenCalledTimes(1);
  });
});
