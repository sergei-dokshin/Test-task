import { Row, ServerResponse } from '../../../types/row.type';
import { toastify } from '../../../utils/toastify';
import TreeRow from '../../TreeRow/TreeRow';
import styles from './TableBody.module.scss';

interface TableBodyProps {
  data: Row[];
  setData: React.Dispatch<React.SetStateAction<Row[]>>;
  editingRowId: number | null;
  setEditingRowId: React.Dispatch<React.SetStateAction<number | null>>;
}

const TableBody = (props: TableBodyProps) => {
  const { data, setData, editingRowId, setEditingRowId } = props;

  const addRow = (parentId: number | null) => {
    if (editingRowId) {
      toastify('warn', 'Сначала завершите создание этого ряда');
      return;
    } // запрещаем если в процессе редактирования
    const newRow: Row = {
      child: [],
      equipmentCosts: 0,
      estimatedProfit: 0,
      id: Date.now(), // временный id
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      rowName: '',
      salary: 0,
      supportCosts: 0,
      total: 0,
      isNewRow: true
    };

    if (parentId === null || data.length === 0) {
      setData((prev) => [...prev, newRow]);
    } else {
      const updateData = (nodes: Row[]): Row[] => {
        return nodes.map((node) => {
          if (node.id === parentId) {
            return { ...node, child: [...node.child, newRow] };
          }
          return { ...node, child: updateData(node.child) };
        });
      };
      setData(updateData(data));
    }
    setEditingRowId(newRow.id);
  };

  const updateRow = (id: number, updatedData: Partial<Row>) => {
    const updateData = (nodes: Row[]): Row[] =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, ...updatedData }
          : { ...node, child: updateData(node.child) }
      );
    setData((prev) => updateData(prev));
    setEditingRowId(null);
  };

  const removeRow = (id: number) => {
    const updateData = (nodes: Row[]): Row[] => {
      return nodes
        .filter((node) => node.id !== id) // Исключаем удаленный узел
        .map((node) => ({
          ...node,
          child: updateData(node.child) // Рекурсивно удаляем из всех уровней
        }));
    };

    setData(updateData(data));
  };

  const updateDataFromResponse = (response: ServerResponse) => {
    setData((prevData) => {
      // Добавляем все измененные элементы в карту для удобства
      const changedMap = new Map<number, Row>();

      // проверка на случай если current или changed равны null
      const allChanges = [response.current, ...(response.changed || [])].filter(
        (item) => item !== null
      );

      // добавляем полученные от сервера обновленные объекты в Map
      allChanges.forEach((item) => {
        if (item) {
          changedMap.set(item.id, {
            ...item,
            child: prevData.find((n) => n.id === item.id)?.child || []
          });
        }
      });

      const updateNode = (node: Row): Row => {
        // Проверяем есть ли обновленная версия
        const updatedNode = changedMap.get(node.id);

        // Если есть изменения - заменяем на полученный от сервера ответ
        if (updatedNode) {
          return {
            ...updatedNode,
            child: node.child.map(updateNode) // Рекурсивно обновляем детей
          };
        }

        // Если нет изменений - обновляем только детей
        return {
          ...node,
          child: node.child.map(updateNode)
        };
      };

      return prevData.map(updateNode);
    });
  };
  return (
    <div className={styles.tableBody}>
      {data.length === 0 ? (
        <div className={`${styles.treeIconWrapper} ${styles.root}`}>
          <i
            className={`bi bi-file-earmark-plus-fill ${styles.icon}`}
            onClick={() => addRow(null)} // Добавляем новый корневой ряд если вообще нет рядов
          ></i>
        </div>
      ) : (
        data.map((row, index) => (
          <TreeRow
            key={row.id}
            row={row}
            level={0}
            parentId={data[index].id === row.id ? null : data[index].id} // если ряд является корневым передаем null
            isLastChild={index === data.length - 1}
            addRow={addRow}
            updateRow={updateRow}
            removeRow={removeRow}
            setData={setData}
            isEditing={row.id === editingRowId}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            updateDataFromResponse={updateDataFromResponse}
          />
        ))
      )}
    </div>
  );
};

export default TableBody;
