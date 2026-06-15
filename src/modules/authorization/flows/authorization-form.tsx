'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputWithLabel } from '@/src/components/feature/input-label';
import { Button } from '@/src/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useAuthFlowId } from '../hooks/auth-form-id';
import { useAuth } from '../hooks/use-auth';

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
    label: 'Логин или Почта',
    placeholder: 'Введите логин или почту',
    id: 1,
    type: 'identifier',
  },
  {
    label: 'Пароль',
    placeholder: 'Введите пароль',
    id: 2,
    prefix: 'forgot password ?',
    type: 'password',
    link: 'forgot-password',
  },
];

const AuthFormShema = z.object({
  identifier: z.string(),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
});

export type AuthFormType = z.infer<typeof AuthFormShema>;

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormShema),
    mode: 'onSubmit',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { data: authFlowId, isLoading } = useAuthFlowId();
  const { mutate } = useAuth();

  const onSubmit = (data: any) => {
    const userData = {
      ...data,
      flow_id: authFlowId?.flow_id,
    };
    console.log(userData, 'data for back in auth ');

    mutate(userData);
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
