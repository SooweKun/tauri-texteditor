'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputWithLabel } from '@/src/components/feature/input-label';
import { Button } from '@/src/components/ui/button';
import { Skeleton } from '@/src/components/ui/skeleton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';
import { useRegFlowId } from '../hooks/register-flow-id';
import { useRegister } from '../hooks/use-register';

type InputArr = {
  label: string;
  placeholder: string;
  id: number;
  name: keyof RegisterFormType;
  type: string;
};

const Inputs: InputArr[] = [
  {
    label: 'Логин',
    placeholder: 'Введите логин',
    id: 1,
    name: 'username',
    type: 'name',
  },
  {
    label: 'Почта',
    placeholder: 'Введите почту',
    id: 2,
    name: 'email',
    type: 'email',
  },
  {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    id: 3,
    name: 'password',
    type: 'password',
  },
];

const RegisterFormShema = z.object({
  email: z.email({ message: 'Некорректный email', pattern: z.regexes.html5Email }),
  username: z.string().min(4, { message: 'Имя должно содержать минимум 4 символа' }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
});

export type RegisterFormType = z.infer<typeof RegisterFormShema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormShema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const { mutate } = useRegister();
  const { data: flowId, isLoading } = useRegFlowId();

  const onSubmit = (data: any) => {
    const userData = {
      ...data,
      flow_id: flowId?.flow_id,
    };
    console.log(userData, 'data for back ');

    mutate(userData);
  };

  return (
    <form className='w-full flex flex-col gap-7 pt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
      {Inputs.map(({ label, placeholder, id, name, type }) => (
        <div key={id}>
          {isLoading ? (
            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-8 w-full' />
            </div>
          ) : (
            <InputWithLabel
              type={type}
              label={label}
              placeholder={placeholder}
              {...register(name as keyof RegisterFormType)}
              errorMessage={errors[name]?.message}
            />
          )}
        </div>
      ))}

      {isLoading ? (
        <div className='space-y-2'>
          <Skeleton className='h-8 w-full' />
        </div>
      ) : (
        <Button variant='secondary' className='bg-[#AE0389] hover:bg-[#c40c9c] text-white font-rubik cursor-pointer' type='submit'>
          sing in
        </Button>
      )}
    </form>
  );
};
