import { For, createSignal } from "solid-js";
import FileCard from "./FileCard";
import { Dialog, DialogTitle, DialogContent, Container, Button } from "@suid/material";
import { useLocation } from "@solidjs/router";
import api from "../../../api/api";

const [open, setOpen] = createSignal(false)
const [activeFile, setActiveFile] = createSignal({})
const dialogHandler = () => { setOpen(!open()) }

const directoryContent = async (dirname) => {
  // replace contents of current FileList.props.data with the result
  return await api.get(`${useLocation().pathname}/${dirname}/`).data
} 

export default function FileList(props) {
  const [currentPath, setCurrentPath] = createSignal(useLocation().pathname);
  
  return (
    <div>
      <hr class="w-full mb-1 border-accent-600 "/>
      <For each={props.data}>
        {
          (file) =>
            <div class="cursor-pointer">
              <FileCard
                isDirectory={file.isDirectory}
                name={file.name}
                onClick={() => {
                  // if isDirectory: navigate
                  if (file.isDirectory) {
                    props.data = directoryContent(file.name);
                    setCurrentPath(`${currentPath()}/${file.name}`)
                  }
                  // else if isReadable(mimeType) == true: view
                  // else: download
                }}
                />
            </div>
        }
      </For>
      
      <Dialog
        open={open()}
        class="bg-primary-300 bg-opacity-50"
      >
        <DialogTitle>Contents of {activeFile().name}</DialogTitle>
          <DialogContent>
            <Container class="border-2 rounded-xl py-2 bg-accent-800 text-accent-200">
              <code class="">
                {activeFile().data}
              </code>  
            </Container>
            
          <div class="relative pt-4 pb-2">
            <Button
              class="absolute right-0 bottom-0"
              variant="outlined"
              color="monochrome"
              onClick={dialogHandler}
              >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}