export interface Row {
  child: Row[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
  isNewRow?: boolean; // для логики создания и редактирования
}

export interface RowToPost extends Omit<Row, 'child' | 'id' | 'total'> {
  parentId: number | null;
}

export interface ResponseRow extends Omit<Row, 'child'> {}
export interface ResponseEditRow extends Omit<Row, 'child' | 'id' | 'total'> {}

export interface ServerResponse {
  changed: ResponseRow[];
  current: ResponseRow;
}
