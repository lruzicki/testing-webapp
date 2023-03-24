import { BuildingBlockTestSummary, ProductsListType } from './types';

const baseUrl = 'http://34.238.75.167:5000';

type Success<T> = { status: true; data: T };
type Failure = { status: false; error: Error };

export const getData = async (offset: number) => {
  return await fetch(`${baseUrl}/report/?limit=20&offset=${offset}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
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

export const getProductListCount = async () => {
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

export const getBuildingBlockTestResults = async (buildingBlockId: string) => {
  return await fetch(`${baseUrl}/report/${buildingBlockId}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
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
