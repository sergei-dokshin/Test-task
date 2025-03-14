import axios, { isAxiosError } from 'axios';
import {
  ResponseEditRow,
  Row,
  RowToPost,
  ServerResponse
} from '../types/row.type';
import { eID } from '../constants/eID';

const http = axios.create({
  baseURL: 'http://185.244.172.108:8081'
});

export const getRows = async () => {
  try {
    const { data } = await http.get<Row[]>(
      `/v1/outlay-rows/entity/${eID}/row/list`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export async function createRow(payload: RowToPost) {
  try {
    const { data } = await http.post<ServerResponse>(
      `/v1/outlay-rows/entity/${eID}/row/create`,
      payload
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function deleteRow(rowId: number) {
  const { data } = await http.delete<ServerResponse>(
    `/v1/outlay-rows/entity/${eID}/row/${rowId}/delete`
  );
  return data;
}

export async function editRow(rowId: number, payload: ResponseEditRow) {
  const { data } = await http.post<ServerResponse>(
    `/v1/outlay-rows/entity/${eID}/row/${rowId}/update`,
    payload
  );
  return data;
}
