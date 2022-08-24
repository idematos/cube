import axios, { AxiosResponse } from "axios"

export function fetchTransactions(): Promise<AxiosResponse> {
  return axios.get("/transaction")
}

export function uploadTransactionFile(file: File): Promise<AxiosResponse> {
  return axios.postForm("/transaction/file", { file })
}
