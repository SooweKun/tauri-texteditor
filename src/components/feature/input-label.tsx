import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

type Props = {
  placeholder: string;
  label: string;
  prefix?: string;
  type: string;
  errorMessage?: string;
};

export function InputWithLabel({ placeholder, label, prefix, type, errorMessage, ...registerProps }: Props) {
  return (
    <div className='grid w-full max-w-sm items-center gap-3'>
      <div className='w-full flex justify-between'>
        <Label htmlFor='email' className='text-white'>
          {label}
        </Label>
        <p className='text-[#AE0389] cursor-pointer'>{prefix}</p>
      </div>
      <Input type={type} placeholder={placeholder} className='bg-[#1A1A1A] border-[#434343] text-white' {...registerProps} />
      {errorMessage && <span className='text-red-500 text-sm'>{errorMessage}</span>}
    </div>
  );
}
