import { ReactElement, useEffect, useState } from "react"

import axios, { AxiosResponse } from "axios"
import get from "lodash/get"
import { TbUpload } from "react-icons/tb"

import Balance from "../components/balance"
import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Select from "../components/select"
import Table from "../components/table/table"
import UploadModal from "../components/uploadModal"

function fetchTransactions(): Promise<AxiosResponse> {
  return axios.get("Transaction")
}

function Transactions(): ReactElement {
  const allSellers = "All sellers"
  const expenseTypeId = 3

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedSeller, setSellectedSeller] = useState(allSellers)

  const filterBySeller = (): any[] => {
    if (selectedSeller === allSellers) return transactions
    return transactions.filter((t) => t.sellerName === selectedSeller)
  }
  const filteredSellers = filterBySeller()

  const changeSelectedSeller = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSellectedSeller(e.target.value)
  }

  const getTotalBalance = (): number => {
    return filteredSellers.reduce(
      (sum, t) => sum + (t.typeId === expenseTypeId ? -t.value : t.value),
      0
    )
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
        setTransactions(response.data)
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
        <Balance
          value={getTotalBalance()}
          income={getTotalIncome()}
          expense={getTotalExpense()}
        />
      }
    >
      <Table
        emptyTitle="No transactions yet"
        emptySubtitle="Upload transactions files to view them here."
        rows={filterBySeller()}
      />
      <UploadModal isOpen={isUploadModalOpen} onClose={handleUploadModal} />
    </PageLayout>
  )
}

export default Transactions
