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
