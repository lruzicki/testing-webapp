import React from 'react';
import ProductTableRow from '../../../components/table/ProductTableRow';
import { render } from '../../test-utils/test-utils';
import { productsList } from './mockedData/ProductTable';

const mockedContainerWidth = (clientWidth: number) =>
  // @ts-ignore
  jest.spyOn(React, 'useRef').mockImplementation((v) => {
    const ref = function (_: any) {
      // @ts-expect-error
      ref.current = { ..._, clientWidth };
    };

    ref(v);

    return ref;
  });

describe('Unit tests for ProductTableRow component:', () => {
  const REST_COUNT_TEST_ID = 'bb-rest-count';

  it('should render the ProductTableRow component and match snapshot', () => {
    const { container } = render(<ProductTableRow product={productsList} />);

    expect(container).toMatchSnapshot();
  });

  it('when product compatibilities length is equal to 0.', async () => {
    const { container, queryByTestId } = render(
      <ProductTableRow product={{ ...productsList, compatibilities: [] }} />
    );

    expect(queryByTestId(REST_COUNT_TEST_ID)).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('when container of items has width 40px and is not overflowing.', () => {
    mockedContainerWidth(40);

    const { queryByTestId } = render(
      <ProductTableRow product={productsList} />
    );

    expect(queryByTestId(REST_COUNT_TEST_ID)).toBeNull();
  });

  it('when container of items has width 100px and is overflowing.', () => {
    mockedContainerWidth(100);

    const { getByTestId } = render(
      <ProductTableRow
        product={{
          ...productsList,
          compatibilities: [
            ...productsList.compatibilities,
            ...productsList.compatibilities,
            ...productsList.compatibilities,
            ...productsList.compatibilities,
          ],
        }}
      />
    );

    expect(getByTestId(REST_COUNT_TEST_ID)).toHaveTextContent('+1');
  });

  it('when container of items has width 50px and is overflowing.', () => {
    mockedContainerWidth(50);

    const { getByTestId } = render(
      <ProductTableRow
        product={{
          ...productsList,
          compatibilities: [
            ...productsList.compatibilities,
            ...productsList.compatibilities,
            ...productsList.compatibilities,
            ...productsList.compatibilities,
          ],
        }}
      />
    );

    expect(getByTestId(REST_COUNT_TEST_ID)).toHaveTextContent('+3');
  });
});
