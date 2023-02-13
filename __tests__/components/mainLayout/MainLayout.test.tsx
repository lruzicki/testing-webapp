import MainLayout from '../../../components/mainLayout/MainLayout';
import { render } from '../../test-utils';

describe('Unit test for HomePage', () => {
  const childrenExample = <p>Test</p>;

  it('renders the home page', () => {
    const { container } = render(<MainLayout>{childrenExample}</MainLayout>);

    expect(container).toMatchSnapshot();
  });
});
