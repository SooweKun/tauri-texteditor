/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputWithLabel } from '@/src/components/feature/input-label';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';

type Props = {
  setValue: (value: string) => void;
  value: string;
};

const EmailFormShema = z.object({
  email: z.email({ message: 'Некорректный email', pattern: z.regexes.html5Email }),
});

type EmailFormType = z.infer<typeof EmailFormShema>;

export const EmailForm: FC<Props> = ({ setValue, value }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormType>({
    resolver: zodResolver(EmailFormShema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setValue('code');
    console.log('value', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email verification</CardTitle>
        <CardDescription>enter your work email so that we can send you a password change code.</CardDescription>
      </CardHeader>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <InputWithLabel
            type='email'
            label='Email'
            placeholder='enter your email'
            key={1}
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </CardContent>
        <CardFooter>
          <Button type='submit'>Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
