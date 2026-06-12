import { WebHeaderLayout } from '@/src/components/layouts/web-header-layout';
import { ProfileModule } from '@/src/modules/profile/module';

export default function ProfilePage() {
  return (
    <WebHeaderLayout>
      <div className='w-full h-screen bg-black flex justify-center items-center'>
        <ProfileModule />
      </div>
    </WebHeaderLayout>
  );
}
