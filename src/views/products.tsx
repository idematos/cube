import { ReactElement } from "react"

import { TbFileUpload } from "react-icons/tb"
import styled from "styled-components"

import Button from "../components/button"
import PageLayout from "../components/pageLayout"
import TitleOptions from "../components/titleOptions"

const StyledButton = styled(Button)`
  width: 160px;
`

function Products(): ReactElement {
  return (
    <PageLayout>
      <TitleOptions
        title="Products"
        actionElement={
          <StyledButton secondary>
            <TbFileUpload size={30} />
            Upload File
          </StyledButton>
        }
      />
      {/* <DataGrid rows={[]]} columns={[]]} /> */}
    </PageLayout>
  )
}

export default Products
