import { Row } from '../../../types/row.type';
import styles from './RowIconsColumn.module.scss';

interface ColumnProps {
  row: Row;
  isLastChild: boolean;
  level: number;
  editingRowId: number | null;
  addRow: (parentId: number | null) => void;
  handleDeleteRow: () => Promise<void>;
}

const RowIconsColumn = (props: ColumnProps) => {
  const { row, isLastChild, level, editingRowId, addRow, handleDeleteRow } =
    props;
  return (
    <div className={styles.treeColumn}>
      <div
        className={`${styles.treeIconWrapper} ${isLastChild ? styles.isLast : ''} 
            ${level === 0 ? styles.root : ''}`}
      >
        <i
          className={`bi bi-file-earmark-plus-fill ${styles.icon} ${editingRowId ? styles.inactive : ''}`}
          onClick={() => addRow(row.id)}
        ></i>
        <i
          className={`bi bi-trash3-fill ${styles.trashIcon}`}
          onClick={() => handleDeleteRow()}
        ></i>
      </div>
    </div>
  );
};

export default RowIconsColumn;
