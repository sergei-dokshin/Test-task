import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRows } from '../services/rows.service';
import { Row } from '../types/row.type';

const placeholder: Row[] = [
  {
    child: [],
    equipmentCosts: 0,
    estimatedProfit: 0,
    id: 3,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    rowName: 'Название работ',
    salary: 0,
    supportCosts: 0,
    total: 0
  }
];

const useRows = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['rows'],
    queryFn: getRows, // функция для получения данных
    placeholderData: (oldData) => {
      if (!oldData) {
        return placeholder;
      } else {
        return oldData;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity, // Время хранения данных в кеше
    refetchOnWindowFocus: false // Запрет обновления при фокусе окна
  });

  useEffect(() => {
    if (isError) {
      console.log('Error uccured during the request 😔');
    }
  }, [isError]);

  return { data, isLoading, isError, error };
};

export default useRows;
