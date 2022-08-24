import { ReactElement, useEffect, useRef, useState } from "react"

import { AxiosResponse } from "axios"
import noop from "lodash"
import { TbFileUpload, TbFile, TbX } from "react-icons/tb"
import styled from "styled-components"

import Button from "./button"

interface ContainerProps {
  isOpen: boolean
}

interface Props extends ContainerProps {
  onClose: () => void
  uploadFile: (file: File) => Promise<AxiosResponse>
}

interface UploadProps {
  isDragging: boolean
}

const Container = styled.div<ContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--shadow);
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 475px;
  min-width: 600px;
  background: var(--white);
  border-radius: 15px;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px;
  gap: 20px;
  flex-grow: 1;
`

const UploadBox = styled.div<UploadProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px dashed var(--dark-blue);
  border-radius: 15px;
  gap: 15px;
  padding: 30px;
  margin: 25px 0 0 0;
  position: relative;

  background-color: ${({ isDragging }) =>
    isDragging ? "var(--gray-200)" : "var(--white)"};

  &:hover {
    background-color: var(--gray-100);
  }
`

const InputBox = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`

const Input = styled.input`
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
`

const UploadFileIcon = styled(TbFileUpload)`
  color: var(--dark-blue);
`

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid var(--gray-200);
  width: 100%;
  padding: 30px 0;
`

const StyledSpan = styled.span`
  font-size: 14px;
`

const FileBox = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  margin: 20px 0 0 0;
  padding: 15px;
  gap: 15px;
`

const ErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  border-radius: 10px;
  margin: 20px 0 0 0;
  padding: 15px;
  gap: 15px;
`

const IconBox = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 5px;
  padding: 5px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
`

const FileIcon = styled(TbFile)`
  color: var(--dark-blue);
`

const ErrorIcon = styled(TbX)`
  color: red;
  cursor: pointer;
`

const CloseIcon = styled(TbX)`
  color: var(--dark-blue);
  cursor: pointer;
`

const StyledButton = styled(Button)`
  width: 40%;
  height: 45px;
`

function UploadModal({ isOpen, onClose, uploadFile }: Props): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const dropZone = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!dropZone?.current) return () => noop

    dropZone.current.addEventListener(
      "dragover",
      () => setIsDragging(true),
      false
    )
    dropZone.current.addEventListener(
      "dragleave",
      () => setIsDragging(false),
      false
    )
    dropZone.current.addEventListener("drop", () => setIsDragging(false), false)

    return () => {
      dropZone.current?.removeEventListener(
        "dragover",
        () => setIsDragging(true),
        false
      )
      dropZone.current?.removeEventListener(
        "dragleave",
        () => setIsDragging(false),
        false
      )
      dropZone.current?.removeEventListener(
        "drop",
        () => setIsDragging(false),
        false
      )
    }
  }, [])

  const changeHandler = (files?: FileList | null): void => {
    setErrorMessage("")
    if (files) {
      const file = files[0]
      if (file.size > 10000) {
        setErrorMessage(
          "It seems your file is too big, try reducing the file size and try again."
        )
      } else {
        setSelectedFile(file)
      }
    } else {
      setSelectedFile(null)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  const handleSubmission = (): void => {
    if (!selectedFile) return
    setIsUploading(true)
    ;(async () => {
      try {
        await uploadFile(selectedFile)
        window.location.reload()
      } catch (error: any) {
        setIsUploading(false)
        setSelectedFile(null)
        setErrorMessage(error.response?.data.detail ?? error.message)
      }
    })()
  }

  return (
    <Container isOpen={isOpen} onClick={onClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <FormContent>
          <h2>Upload File</h2>
          <span>Upload a file from your computer.</span>
          <UploadBox ref={dropZone} isDragging={isDragging}>
            <InputBox>
              <Input
                type="file"
                accept=".txt"
                ref={inputRef}
                onChange={(e) => changeHandler(e.target.files)}
              />
            </InputBox>
            <UploadFileIcon size={60} />
            <h4>Click to upload or drag and drop file here.</h4>
            <StyledSpan>Maximum file size 10MB.</StyledSpan>
          </UploadBox>
          {selectedFile && (
            <FileBox>
              <IconBox>
                <FileIcon size={25} />
              </IconBox>
              <Details>
                <h5>{selectedFile.name}</h5>
                <StyledSpan>
                  {(selectedFile.size / 1000).toFixed(2)} KB
                </StyledSpan>
              </Details>
              <CloseIcon size={15} onClick={() => changeHandler()} />
            </FileBox>
          )}
          {errorMessage.length > 0 && (
            <ErrorBox>
              <IconBox>
                <ErrorIcon size={20} />
              </IconBox>
              <Details>
                <h5>Sorry</h5>
                <StyledSpan>{errorMessage}</StyledSpan>
              </Details>
              <CloseIcon size={15} onClick={() => changeHandler()} />
            </ErrorBox>
          )}
        </FormContent>
        <FormFooter>
          <StyledButton secondary onClick={onClose}>
            Cancel
          </StyledButton>
          <StyledButton
            loading={isUploading}
            disabled={!selectedFile || isUploading}
            onClick={handleSubmission}
          >
            Upload file
          </StyledButton>
        </FormFooter>
      </Card>
    </Container>
  )
}

export default UploadModal
