import useRows from '../../hooks/useRows';
import TableTree from '../TableTree/TableTree';
import styles from './ContentBody.module.scss';

const ContentBody = () => {
  const { data, isLoading, isError, error } = useRows(); // данные из useQuery()

  if (isError) {
    return <div>Ошибка загрузки: {error && error.message}</div>; 
  }

  return (
    <div className={styles.mainContent}>
      {isLoading ? (
        <div>Загрузка данных...</div>
      ) : (
        <>
          <div className={styles.header}>Строительно-монтажные работы</div>
          {data && <TableTree payload={data} />}
        </>
      )}
    </div>
  );
};

export default ContentBody;
