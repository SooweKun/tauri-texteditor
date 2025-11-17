import { RoutDispatcher } from '../components/flows/rout-dispatcher';
import { TauriHomeModule } from '../modules/tauri-home/module';
import { WebHomeModule } from '../modules/web-home/module';

export default function Home() {
  return <RoutDispatcher TauriComponent={<TauriHomeModule />} WebComponent={<WebHomeModule />} />;
}
