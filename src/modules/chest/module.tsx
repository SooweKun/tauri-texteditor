import { Chests } from "./feature/chests"
import { NewChest } from "./feature/new-chest"

export const ChestModule = () => {
    return (
        <div className="flex flex-col w-full h-full gap-0">
           <Chests />
           <NewChest />
        </div>
    )
}