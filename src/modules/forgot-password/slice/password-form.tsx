/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputWithLabel } from '@/src/components/feature/input-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const PasswordFormShema = z.object({
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' })
    .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' }),
});

type PasswordFormType = z.infer<typeof PasswordFormShema>;

export const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormShema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password here. After saving, you&apos;ll be redirect on register page.</CardDescription>
      </CardHeader>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <InputWithLabel
            type='password'
            label='New password'
            placeholder='enter your new password'
            key={1}
            {...register('password')}
            errorMessage={errors.password?.message}
          />
        </CardContent>
        <CardFooter>
          <Button type='submit'>Save password</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
