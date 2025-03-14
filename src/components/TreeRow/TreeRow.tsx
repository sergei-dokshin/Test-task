import { useEffect, useState } from 'react';
import styles from './TreeRow.module.scss';
import { Row, ServerResponse } from '../../types/row.type';
import { isAxiosError } from 'axios';
import { createRow, deleteRow, editRow } from '../../services/rows.service';
import { toastify } from '../../utils/toastify';
import RowIconsColumn from './RowIconsColumn/RowIconsColumn';
import DataColumns from './DataColumns/DataColumns';

interface TreeRowProps {
  row: Row;
  level: number;
  parentId: number | null;
  isLastChild: boolean;
  addRow: (parentId: number | null) => void;
  updateRow: (id: number, updatedData: Row) => void;
  removeRow: (id: number) => void;
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
  isEditing: boolean;
  editingRowId: number | null;
  setEditingRowId: (id: number | null) => void;
  updateDataFromResponse: (response: ServerResponse) => void;
}

const TreeRow: React.FC<TreeRowProps> = (props) => {
  const {
    row,
    level,
    parentId,
    isLastChild,
    addRow,
    updateRow,
    removeRow,
    setData,
    isEditing,
    editingRowId,
    setEditingRowId,
    updateDataFromResponse
  } = props;
  const [formData, setFormData] = useState<Row>({ ...row });

  const rowsData: (keyof Row)[] = [
    'rowName',
    'salary',
    'equipmentCosts',
    'overheads',
    'estimatedProfit'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Row
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const checkNotEmpty = () => {
    // выполняем проверку что все поля заполнены
    // p.s. не лучшая валидация :)
    return (
      formData.rowName.trim() !== '' &&
      formData.salary != null &&
      formData.equipmentCosts != null &&
      formData.overheads != null &&
      formData.estimatedProfit != null
    );
  };

  const handleCreateRow = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!checkNotEmpty()) {
        toastify('error', 'Все поля должны быть заполнены');
        return;
      }
      try {
        // отправляем данные на сервер
        const data = await createRow({
          equipmentCosts: formData.equipmentCosts,
          estimatedProfit: formData.estimatedProfit,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: formData.overheads,
          parentId: parentId,
          rowName: formData.rowName,
          salary: formData.salary,
          supportCosts: 0
        });
        // меняем временный id на id полученный от сервера
        updateRow(row.id, {
          ...formData,
          id: data.current.id,
          isNewRow: false // Row больше не является новым - при нажатии клавиши enter при редактировании мы будем обновлять его, а не создавать
        });
        updateDataFromResponse(data); // обновляем в соответствии с полученными от сервера данными
      } catch (error) {
        if (isAxiosError(error)) {
          toastify('error', error.message);
        }
      }
    }
  };

  const handleDeleteRow = async () => {
    if (editingRowId) {
      removeRow(row.id); // удаляем локально
      setEditingRowId(null);
      return;
    }
    try {
      removeRow(row.id); // удаляем локально
      const data = await deleteRow(row.id); // запрос к серверу на удаление
      updateDataFromResponse(data); // обновляем в соответствии с полученными от сервера данными
    } catch (error) {
      if (isAxiosError(error)) {
        toastify('error', error.message);
      }
    }
  };

  const handleUpdateRow = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!checkNotEmpty()) {
        toastify('error', 'Все поля должны быть заполнены');
        return;
      }
      try {
        // отправляем данные на сервер
        const data = await editRow(row.id, {
          equipmentCosts: formData.equipmentCosts,
          estimatedProfit: formData.estimatedProfit,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: formData.overheads,
          rowName: formData.rowName,
          salary: formData.salary,
          supportCosts: 0
        });
        setEditingRowId(null); // выходим из режима редактирования
        updateDataFromResponse(data); // обновляем в соответствии с полученными от сервера данными
      } catch (error) {
        if (isAxiosError(error)) {
          toastify('error', error.message);
        }
      }
    }
  };

  useEffect(() => {
    setFormData({ ...row });
  }, [row]);

  return (
    <>
      <div
        className={styles.tableRow}
        style={{ ['--level' as any]: level } as React.CSSProperties}
        onDoubleClick={() => {
          if (editingRowId === null) {
            setEditingRowId(row.id);
          }
        }}
      >
        <RowIconsColumn
          row={row}
          isLastChild={isLastChild}
          level={level}
          addRow={addRow}
          handleDeleteRow={handleDeleteRow}
          editingRowId={editingRowId}
        />
        <DataColumns
          formData={formData}
          isNewRow={row.isNewRow}
          rowsData={rowsData}
          isEditing={isEditing}
          handleCreateRow={handleCreateRow}
          handleUpdateRow={handleUpdateRow}
          handleInputChange={handleInputChange}
        />
      </div>
      {row.child?.map((child, index) => (
        <TreeRow
          key={child.id}
          row={child}
          level={level + 1}
          parentId={row.id}
          isLastChild={index === row.child.length - 1}
          addRow={addRow}
          updateRow={updateRow}
          removeRow={removeRow}
          setData={setData}
          isEditing={child.id === editingRowId}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
          updateDataFromResponse={updateDataFromResponse}
        />
      ))}
    </>
  );
};

export default TreeRow;
