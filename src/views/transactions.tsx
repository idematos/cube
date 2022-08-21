import { ReactElement } from "react"

import { TbFileUpload } from "react-icons/tb"
import styled from "styled-components"

import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import Table from "../components/table/table"

const StyledButton = styled(Button)`
  width: 160px;
`

function Transactions(): ReactElement {
  return (
    <PageLayout
      title="Transactions"
      actionElement={
        <StyledButton secondary>
          <TbFileUpload size={30} />
          Upload File
        </StyledButton>
      }
    >
      <Table rows={[]} columns={[]} />
    </PageLayout>
  )
}

export default Transactions
