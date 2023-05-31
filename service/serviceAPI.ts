import {
  ResultTableSortByType,
  SoftwaresTableSortByType,
} from '../components/table/types';
import { BuildingBlockTestSummary, ProductsListType } from './types';

const baseUrl = 'https://api.testing.govstack.global';

type Success<T> = { status: true; data: T };
type Failure = { status: false; error: Error };

const handleFieldsToSort = (
  sortBy: ResultTableSortByType | SoftwaresTableSortByType
) =>
  Object.values(sortBy)
    .filter((order) => order.order !== null)
    .map((sortProperty) => `sort.${sortProperty.field}=${sortProperty.order}`)
    .join('&');

export const getSoftwaresData = async (
  offset: number,
  sortBy: SoftwaresTableSortByType
) => {
  const sortedParameters = handleFieldsToSort(sortBy);

  return await fetch(
    `${baseUrl}/report/?limit=20&offset=${offset}&${sortedParameters}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then<Success<ProductsListType>>((actualData) => {
      return { data: actualData, status: true };
    })
    .catch<Failure>((error) => {
      return { error, status: false };
    });
};

export const getSoftwareListCount = async () => {
  return await fetch(`${baseUrl}/report/count`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then<Success<number>>((actualCount) => {
      return {
        status: true,
        data: actualCount.count,
      };
    })
    .catch<Failure>((error) => {
      return {
        status: false,
        error,
      };
    });
};

export const getBuildingBlockTestResults = async (
  buildingBlockId: string,
  sortBy: ResultTableSortByType
) => {
  const sortedParameters = handleFieldsToSort(sortBy);

  return await fetch(
    `${baseUrl}/report/${buildingBlockId}?${sortedParameters}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then<Success<BuildingBlockTestSummary>>((actualData) => {
      return { data: actualData, status: true };
    })
    .catch<Failure>((error) => {
      return { error, status: false };
    });
};
