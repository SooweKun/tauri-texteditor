import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/src/components/ui/context-menu';

export function Banner() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className='group w-full h-[200px] rounded-[10px] bg-a flex justify-center items-center cursor-pointer bg-[#1a1a1a]'>
        <p className='text-white text-center opacity-0 group-hover:opacity-100 text-2xl'>right click to change</p>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-48'>
        <ContextMenuGroup>
          <ContextMenuItem>
            <p className='text-red-400'>Back</p>
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            New banner
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
