import styles from './TableHead.module.scss';

const TableHead = ({ tableHeaders }: { tableHeaders: string[] }) => {
  return (
    <div className={styles.tableHeader}>
      {tableHeaders.map((header, index) => (
        <div key={header + index}>{header}</div>
      ))}
    </div>
  );
};

export default TableHead;
