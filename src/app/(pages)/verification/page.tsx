import { VerificationModule } from '@/src/modules/verification/module';
import { Suspense } from 'react';

export default function Verification() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className='w-full h-screen bg-black flex items-center justify-center'>
        <VerificationModule />
      </div>
    </Suspense>
  );
}
