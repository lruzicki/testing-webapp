import HomePage from '../../pages/index'
import { render } from '../test-utils';

describe('Unit test for HomePage', () => {
  it('renders the home page', () => {
    const { container } = render(
      <HomePage />
      )

    expect(container).toMatchSnapshot();
  })
})
