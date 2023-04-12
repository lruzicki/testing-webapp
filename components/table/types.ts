export type SortResultTableFieldType = 'status' | 'uri' | 'name';

export type ColumnSortType = {
  field: SortResultTableFieldType;
  order: 'desc' | 'asc' | null;
};

export type ResultTableSortByType = {
  status: ColumnSortType;
  uri: ColumnSortType;
  name: ColumnSortType;
};
export type SortFieldType = 'software' | 'date' | 'compatibility';

export type ColumnSortType = {
  field: SortFieldType;
  order: 'desc' | 'asc' | null;
};

export type TableSortByType = {
  software: ColumnSortType;
  date: ColumnSortType;
  compatibility: ColumnSortType;
};
