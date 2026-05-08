'use client';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export const OpenChest = () => {
  const Create = () => {
    const webview = new WebviewWindow('chest', {
      url: '/chest',
      title: 'Управление хранилищем',
      width: 750,
      height: 600,
      resizable: false,
      center: true,
    });

    webview.once('tauri://created', function () {});

    webview.once('tauri://error', function (e) {
      console.log(e, 'ошибка создания окна ');
    });
  };

  return (
    <button onClick={Create} className='cursor-pointer'>
      Управление хранилищем
    </button>
  );
};
