import { ObserverLayout } from '@/src/components/layouts/observer-layout';

export const TauriHomeModule = () => {
  // const handleCreateFile = async (data: any) => {
  //   const filePath = `C:/Users/apext/program/tauri-texteditor/tmp/${data.createFile}.md`;
  //   try {
  //     await invoke('create_file', { path: filePath });
  //   } catch {
  //     console.log('ошибка');
  //   }
  // };

  // const DeleteCreateFile = async (data: any) => {
  //   console.log(data.deleteFile);
  //   const filePath = `C:/Users/apext/program/tauri-texteditor/tmp/${data.deleteFile}.md`;
  //   try {
  //     await invoke('delete_file', { path: filePath });
  //   } catch {
  //     console.log('ошибка');
  //   }
  // };

  return (
    <ObserverLayout>
      <div className='text-white flex flex-col w-full justify-center items-center'>
        <p>home-tauri</p>
      </div>
    </ObserverLayout>
  );
};
