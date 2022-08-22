import { ReactElement, useEffect, useState } from "react"

import axios, { AxiosResponse } from "axios"
import { TbFileUpload } from "react-icons/tb"

import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Table, { TableColumns } from "../components/table/table"
import UploadModal from "../components/uploadModal"

function fetchTransactions(): Promise<AxiosResponse> {
  return axios.get("Transaction")
}

const transactionColumns: TableColumns[] = [
  {
    path: "date",
    label: "Date",
  },
  {
    path: "type.description",
    label: "Type",
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
  },
]

function Transactions(): ReactElement {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [transactions, setTransactions] = useState(null)

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
      actionElement={
        <Button secondary onClick={handleUploadModal}>
          <TbFileUpload size={20} />
          Upload File
        </Button>
      }
    >
      <Table
        emptyTitle="No transactions yet"
        emptySubtitle="Upload transactions files to view them here."
        rows={transactions}
        columns={transactionColumns}
      />
      <UploadModal isOpen={isUploadModalOpen} onClose={handleUploadModal} />
    </PageLayout>
  )
}

export default Transactions
