'use client';
import { userAtom } from '@/src/store/user';
import { useAtom } from 'jotai';
import { useRef } from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/src/components/ui/context-menu';

export function Avatar() {
  const [user, setUser] = useAtom(userAtom);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handleAvatarChange} />
      <ContextMenu>
        <ContextMenuTrigger className='group w-[125px] h-[125px] bg-[#272727] rounded-[5px] cursor-pointer relative flex justify-center items-center overflow-hidden'>
          {user.avatar ? (
            <img src={user.avatar} alt='avatar' className='size-full object-cover' width={125} height={125} />
          ) : (
            <p className='text-white text-center opacity-0 group-hover:opacity-100'>пкм что бы изменить</p>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent className='w-48'>
          <ContextMenuGroup>
            <ContextMenuItem>
              <p className='text-red-400'>Назад</p>
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => fileInputRef.current?.click()}>
              Изменить
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
