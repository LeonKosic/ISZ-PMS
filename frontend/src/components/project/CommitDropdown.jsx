import { Menu, MenuItem } from "@suid/material"
import { createSignal } from "solid-js"

export default function CommitDropdown(props) {
  // props.callback treba biti setActiveCommit(commitID)
  // (ova) komponenta ne moze direktno uticati na activeFiles
  // zbog tog se dodjeljuje lambda iz parent komponente

  const [anchorEl, setAnchorEl] = createSignal(null)
  const open = () => Boolean(anchorEl())
  const [currentCommit, setCurrentCommit] = createSignal(props.commitID)

  return (
    <div>
      <hr class="mt-4 mb-2 border-2 border-accent-600 rounded-xl" />
      <div class="text-lg flex flex-row justify-center items-center mb-1">
        <p>Current commit: {currentCommit()}</p>
      </div>
      <div class="text-lg flex flex-row justify-center items-center mb-2">
        <p>Total commits: {props.commits.length}</p>
      </div>

      <div
        class="flex flex-auto justify-center items-center"
      >
        <div class="border-2 border-accent-600 w-1/3 flex flex-row items-center justify-center hover:bg-accent-600 bg-opacity-15 duration-300 hover:cursor-pointer rounded-lg"
          onClick={(ev) => { setAnchorEl(ev.target) }}
        >
          <p class="text-xl">Change</p>
        </div>
      </div>

      <Menu
        id="commit-dropdown"
        open={open()}
        class="max-h-48"
        anchorEl={anchorEl()}
        onClose={() => { setAnchorEl(null) }}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <For each={props.commits}>
          {
            (commitID) =>
              <MenuItem
                onClick={() => { props.callback(commitID); setAnchorEl(null); setCurrentCommit(commitID) }}
                class="w-32 bg-accent-600"
              >
                <p>
                  {commitID}
                </p>
              </MenuItem>
          }
        </For>
      </Menu>
      <hr class="mt-4 mb-2 border-2 border-accent-600 rounded-xl" />
    </div>
  )
}