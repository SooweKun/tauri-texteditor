import { RoutDispatcher } from '../components/flows/rout-dispatcher';
import { TauriHomeModule } from '../modules/tauri-home/module';
import { WebHomeModule } from '../modules/web-home/module';

export default function Home() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <RoutDispatcher TauriComponent={<TauriHomeModule />} WebComponent={<WebHomeModule />} />
    </div>
  );
}
