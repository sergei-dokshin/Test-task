import { useEffect, useState } from 'react';
import styles from './TableTree.module.scss';
import { Row } from '../../types/row.type';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

export default function TableTree({ payload }: { payload: Row[] }) {
  const [data, setData] = useState<Row[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const tableHeaders = [
    'Уровень',
    'Наименование работ',
    'Основная з/п',
    'Оборудование',
    'Основные расходы',
    'Сметная прибыль'
  ]; // Заголовки для таблицы

  useEffect(() => {
    setData(payload);
  }, [payload]);


  return (
    <div className={styles.treeTable}>
      <TableHead tableHeaders={tableHeaders} />
      <TableBody
        data={data}
        setData={setData}
        editingRowId={editingRowId}
        setEditingRowId={setEditingRowId}
      />
    </div>
  );
}
