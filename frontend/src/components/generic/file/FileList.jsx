import { For, createSignal } from "solid-js";
import FileCard from "./FileCard";
import { Dialog, DialogTitle, DialogContent, Container, Button } from "@suid/material";

const [open, setOpen] = createSignal(false)
const [activeFile, setActiveFile] = createSignal({})
const dialogHandler = () => { setOpen(!open()) }


export default function FileList(props) {
  return (
    <div>
      <hr class="w-full mb-1 border-accent-600 "/>
      <For each={props.data}>
        {
          (file) =>
            <div class="cursor-pointer">
              <FileCard
                type={file.type}
                name={file.name}
                onClick={() => {
                  if (file.type === 'dir')
                    console.log("directory - open in another folder")
                  else {
                    dialogHandler()
                    setActiveFile(file)
                  }
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