'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputWithLabel } from '@/src/components/feature/input-label';
import { Button } from '@/src/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';

type InputArr = {
  label: string;
  placeholder: string;
  id: number;
  name: keyof RegisterFormType;
  type: string;
};

const Inputs: InputArr[] = [
  {
    label: 'Email',
    placeholder: 'Email',
    id: 1,
    name: 'email',
    type: 'email',
  },
  {
    label: 'Password',
    placeholder: 'Password',
    id: 2,
    name: 'password',
    type: 'password',
  },
];

const RegisterFormShema = z.object({
  email: z.email({ message: 'Некорректный email', pattern: z.regexes.html5Email }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
});

type RegisterFormType = z.infer<typeof RegisterFormShema>;

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
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className='w-full flex flex-col gap-7 pt-10' onSubmit={handleSubmit(onSubmit)} noValidate>
      {Inputs.map(({ label, placeholder, id, name, type }) => (
        <InputWithLabel
          type={type}
          label={label}
          placeholder={placeholder}
          key={id}
          {...register(name as keyof RegisterFormType)}
          errorMessage={errors[name]?.message}
        />
      ))}
      <Button variant='secondary' className='bg-[#AE0389] hover:bg-[#c40c9c] text-white font-rubik cursor-pointer' type='submit'>
        sing in
      </Button>
    </form>
  );
};
