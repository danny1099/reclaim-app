export interface ColumnConfig {
  style?: string;
  label?: string;
  format: <T>(param: T) => string;
}

export type ColumnsConfig<T> = {
  [K in keyof T]?: ColumnConfig;
};

export type ColumnConfigs = keyof ColumnConfig;
