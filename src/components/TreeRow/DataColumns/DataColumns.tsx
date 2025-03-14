import { Row } from '../../../types/row.type';
import styles from './DataColumns.module.scss';

interface DataColumnsProps {
  formData: Row;
  isNewRow: boolean | undefined;
  rowsData: (keyof Row)[];
  isEditing: boolean;
  handleCreateRow: (e: React.KeyboardEvent) => Promise<void>;
  handleUpdateRow: (e: React.KeyboardEvent) => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Row
  ) => void;
}

const DataColumns = (props: DataColumnsProps) => {
  const {
    formData,
    isNewRow,
    rowsData,
    isEditing,
    handleCreateRow,
    handleUpdateRow,
    handleInputChange
  } = props;

  return (
    <>
      {isEditing ? (
        <>
          {rowsData.map((item, index) => {
            // Преобразуем тип т.к. атрибут value для input ожидает строку
            const key = item as keyof Row;
            const value = formData[key];
            const inputValue =
              typeof value === 'string' || typeof value === 'number'
                ? value.toString()
                : '';

            return (
              <input
                type={index === 0 ? 'text' : 'number'}
                value={inputValue}
                onChange={(e) => handleInputChange(e, item)}
                onKeyDown={isNewRow ? handleCreateRow : handleUpdateRow}
                className={styles.rowInput}
                placeholder={index === 0 ? 'Названия работ' : '36000'}

                key={item + index}
              />
            );
          })}
        </>
      ) : (
        <>
          {rowsData.map((item, index) => {
            // Преобразуем тип т.к. атрибут value для input ожидает строку
            const key = item as keyof Row;
            const value = formData[key];
            const inputValue =
              typeof value === 'string' || typeof value === 'number'
                ? value.toString()
                : '';

            return (
              <div key={item + index} className={styles.dataCell}>
                {inputValue}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DataColumns;
