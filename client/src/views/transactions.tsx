import { ReactElement, useState } from "react"

import { TbFileUpload } from "react-icons/tb"
import styled from "styled-components"

import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Table from "../components/table/table"
import UploadModal from "../components/uploadModal"

function Transactions(): ReactElement {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const handleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen)
  }

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
        rows={[]}
        columns={[]}
      />
      <UploadModal isOpen={isUploadModalOpen} onClose={handleUploadModal} />
    </PageLayout>
  )
}

export default Transactions
