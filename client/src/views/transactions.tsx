import { ReactElement, useEffect, useState } from "react"

import get from "lodash/get"
import moment from "moment-timezone"
import { TbUpload } from "react-icons/tb"

import Balance from "../components/balance"
import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Select from "../components/select"
import Table, { TableColumn } from "../components/table/table"
import UploadModal from "../components/uploadModal"
import formatBrlCurrency from "../components/utils/formatBrlCurrency"
import { numberSorter, stringSorter } from "../components/utils/sorters"
import {
  fetchTransactions,
  uploadTransactionFile,
} from "../services/transactionService"

type TransactionTypeNature = 0 | 1

type Transaction = {
  id: number
  date: string
  typeId: number
  type: {
    nature: TransactionTypeNature
    description: string
  }
  sellerName: string
  productDescription: string
  value: number
}

const timeZone = moment.tz.guess()

const transactionColumns: TableColumn[] = [
  {
    path: "id",
    label: "ID",
    sorter: numberSorter,
    formatter: (value: number) => `# ${value}`,
  },
  {
    path: "date",
    label: "Date",
    formatter: (value: string) => moment.utc(value).tz(timeZone).format("lll"),
  },
  {
    path: "type",
    label: "Type",
    sorter: (rows, direction) =>
      stringSorter(rows, direction, "type.description"),
    formatter: (value) =>
      value.nature === 1
        ? `(-) ${value.description}`
        : `(+) ${value.description}`,
  },
  {
    path: "sellerName",
    label: "Seller",
  },
  {
    path: "productDescription",
    label: "Product",
  },
  {
    path: "value",
    label: "Value",
    sorter: numberSorter,
    formatter: (value: number) => formatBrlCurrency(value),
  },
]

function Transactions(): ReactElement {
  const allSellers = "All sellers"

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedSeller, setSellectedSeller] = useState(allSellers)
  const [isLoading, setIsLoading] = useState(false)

  const getSellerOptions = (): string[] => {
    const sellers = transactions.map((t) => get(t, "sellerName"))
    return [allSellers, ...new Set(sellers)]
  }

  const changeSelectedSeller = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSellectedSeller(e.target.value)
  }

  const filterBySeller = (): Transaction[] => {
    if (selectedSeller === allSellers) return transactions
    return transactions.filter((t) => t.sellerName === selectedSeller)
  }
  const filteredBySeller = filterBySeller()

  const getTotalIncome = (): number => {
    return filteredBySeller.reduce(
      (sum, t) => sum + (t.type.nature === 1 ? 0 : t.value),
      0
    )
  }

  const getTotalExpense = (): number => {
    return filteredBySeller.reduce(
      (sum, t) => sum + (t.type.nature === 1 ? t.value : 0),
      0
    )
  }

  const handleUploadModal = (): void => {
    setIsUploadModalOpen(!isUploadModalOpen)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const response = await fetchTransactions()
      setIsLoading(false)
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
        <Balance income={getTotalIncome()} expense={getTotalExpense()} />
      }
    >
      <Table
        emptyTitle="No transactions yet"
        emptySubtitle="Upload transactions files to view them here."
        rows={filteredBySeller}
        columns={transactionColumns}
        isLoading={isLoading}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleUploadModal}
        uploadFile={uploadTransactionFile}
      />
    </PageLayout>
  )
}

export default Transactions
