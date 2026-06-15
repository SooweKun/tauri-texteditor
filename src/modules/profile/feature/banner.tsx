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

export function Banner() {
  const [user, setUser] = useAtom(userAtom);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        banner: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handleBannerChange} />

      <ContextMenu>
        <ContextMenuTrigger className='group relative w-full h-[200px] rounded-[10px] overflow-hidden bg-[#1a1a1a] flex justify-center items-center cursor-pointer'>
          {user.banner ? <img src={user.banner} alt='Banner' className='absolute inset-0 w-full h-full object-cover' /> : null}

          <p className='relative z-10 text-white text-center opacity-0 group-hover:opacity-100 text-2xl transition-opacity'>
            пкм что бы изменить
          </p>
        </ContextMenuTrigger>

        <ContextMenuContent className='w-48'>
          <ContextMenuGroup>
            <ContextMenuItem>
              <p className='text-red-400'>Назад</p>
              <ContextMenuShortcut>⌘</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuItem onClick={() => fileInputRef.current?.click()}>
              Изменить
              <ContextMenuShortcut>⌘</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
