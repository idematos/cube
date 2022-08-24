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
import FormatBrlCurrency from "../components/utils/formatBrlCurrency"
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

const transactionColumns: TableColumn[] = [
  {
    label: "ID",
    raw: "id",
    formatted: "formattedId",
    isNumeric: true,
  },
  {
    label: "Date",
    raw: "date",
    formatted: "formattedDate",
    isNumeric: false,
  },
  {
    label: "Type",
    raw: "type.description",
    formatted: "formattedType",
    isNumeric: false,
  },
  {
    label: "Seller",
    raw: "sellerName",
    formatted: "sellerName",

    isNumeric: false,
  },
  {
    label: "Product",
    raw: "productDescription",
    formatted: "productDescription",
    isNumeric: false,
  },
  {
    label: "Value",
    raw: "value",
    formatted: "formattedValue",
    isNumeric: true,
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
        const timeZone = moment.tz.guess()

        setTransactions(
          response.data.map((d: Transaction) => ({
            ...d,
            formattedId: `# ${d.id}`,
            formattedDate: moment.utc(d.date).tz(timeZone).format("lll"),
            formattedType:
              d.type.nature === 1
                ? `(-) ${d.type.description}`
                : `(+) ${d.type.description}`,
            formattedValue: FormatBrlCurrency(d.value),
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
