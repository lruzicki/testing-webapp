import Table from '../../../components/table/Table';
import { render } from '../../test-utils/test-utils';

describe('Unit tests for Table component:', () => {
  it('should render the Table component and match snapshot', () => {
    const { container } = render(<Table />);

    expect(container).toMatchSnapshot();
  });
});
