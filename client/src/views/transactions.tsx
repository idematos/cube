import { ReactElement, useEffect, useState } from "react"

import axios, { AxiosResponse } from "axios"
import get from "lodash/get"
import moment from "moment-timezone"
import { TbUpload } from "react-icons/tb"

import Balance from "../components/balance"
import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Select from "../components/select"
import Table from "../components/table/table"
import UploadModal from "../components/uploadModal"

type Transaction = {
  id: number
  date: string
  typeId: number
  sellerName: string
  productDescription: string
  value: number
}

function fetchTransactions(): Promise<AxiosResponse> {
  return axios.get("Transaction")
}

function Transactions(): ReactElement {
  const allSellers = "All sellers"
  const expenseTypeId = 3

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedSeller, setSellectedSeller] = useState(allSellers)

  const filterBySeller = (): Transaction[] => {
    if (selectedSeller === allSellers) return transactions
    return transactions.filter((t) => t.sellerName === selectedSeller)
  }

  const filteredSellers = filterBySeller()

  const changeSelectedSeller = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSellectedSeller(e.target.value)
  }

  const getTotalIncome = (): number => {
    return filteredSellers.reduce(
      (sum, t) => sum + (t.typeId === expenseTypeId ? 0 : t.value),
      0
    )
  }

  const getTotalExpense = (): number => {
    return filteredSellers.reduce(
      (sum, t) => sum + (t.typeId === expenseTypeId ? t.value : 0),
      0
    )
  }

  const getSellerOptions = (): string[] => {
    const sellers = transactions.map((t) => get(t, "sellerName"))
    return [allSellers, ...new Set(sellers)]
  }

  const handleUploadModal = (): void => {
    setIsUploadModalOpen(!isUploadModalOpen)
  }

  useEffect(() => {
    ;(async () => {
      const response = await fetchTransactions()
      if (response.status === 200) {
        const timeZone = moment.tz.guess()

        setTransactions(
          response.data.map((d: Transaction) => ({
            ...d,
            date: moment.utc(d.date).tz(timeZone).format("lll"),
          }))
        )
      }
    })()
  }, [])

  return (
    <PageLayout
      title="Transactions"
      actionElements={
        <>
          <Button secondary onClick={handleUploadModal}>
            <TbUpload size={18} />
            Upload File
          </Button>
          {transactions.length > 0 && (
            <Select
              options={getSellerOptions()}
              onChange={(e) => changeSelectedSeller(e)}
            />
          )}
        </>
      }
      rightElement={
        <Balance income={getTotalIncome()} expense={getTotalExpense()} />
      }
    >
      <Table
        emptyTitle="No transactions yet"
        emptySubtitle="Upload transactions files to view them here."
        rows={filteredSellers}
      />
      <UploadModal isOpen={isUploadModalOpen} onClose={handleUploadModal} />
    </PageLayout>
  )
}

export default Transactions
