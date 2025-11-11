import { AuthorizationModule } from '@/src/modules/authorization/module';

export default function Authorization() {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'>
      <AuthorizationModule />
    </div>
  );
}
