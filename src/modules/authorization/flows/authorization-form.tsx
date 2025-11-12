'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputWithLabel } from '@/src/components/feature/input-label';
import { Button } from '@/src/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

type InputsType = {
  label: string;
  placeholder: string;
  id: number;
  type: keyof AuthFormType;
  prefix?: string;
  link?: string;
};

const Inputs: InputsType[] = [
  {
    label: 'Email',
    placeholder: 'Email',
    id: 1,
    type: 'email',
  },
  {
    label: 'Password',
    placeholder: 'Password',
    id: 2,
    prefix: 'forgot password ?',
    type: 'password',
    link: 'forgot-password',
  },
];

const AuthFormShema = z.object({
  email: z.email({ pattern: z.regexes.html5Email, message: 'Некорректный email' }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
});

type AuthFormType = z.infer<typeof AuthFormShema>;

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormShema),
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
      {Inputs.map(({ label, placeholder, id, prefix, type, link }) => (
        <InputWithLabel
          label={label}
          placeholder={placeholder}
          key={id}
          prefix={prefix}
          type={type}
          link={link}
          {...register(type as keyof AuthFormType)}
          errorMessage={errors[type]?.message}
        />
      ))}
      <Button variant='secondary' className='bg-[#AE0389] hover:bg-[#c40c9c] text-white font-rubik cursor-pointer' type='submit'>
        sing in
      </Button>
    </form>
  );
};
