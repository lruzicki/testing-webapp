import HomePage from '../../pages/index';
import { render } from '../test-utils/test-utils';

describe('Unit test for HomePage', () => {
  it('render the Home page', () => {
    const { container } = render(<HomePage />);

    expect(container).toMatchSnapshot();
  });
});
