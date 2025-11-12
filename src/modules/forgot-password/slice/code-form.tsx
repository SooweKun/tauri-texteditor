import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/src/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

type Props = {
  setValue: (value: string) => void;
  value: string;
};

const CodeFormSchema = z.object({
  otp: z.string().length(6, {
    message: 'Ваш одноразовый код должен состоять из 6 символов.',
  }),
});

type CodeFormType = z.infer<typeof CodeFormSchema>;

export const CodeForm: FC<Props> = ({ setValue, value }) => {
  const form = useForm<CodeFormType>({
    resolver: zodResolver(CodeFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      otp: '',
    },
  });

  const sendCode = () => {
    setValue('password');
    console.log('value', value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendCode)} className='space-y-6'>
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Card>
                  <CardHeader>
                    <CardTitle>Code verification</CardTitle>
                    <CardDescription>enter the code that we have sent to your email</CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-6'>
                    <div className='w-full flex justify-center'>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <FormMessage />
                  </CardContent>
                  <CardFooter>
                    <Button type='submit'>Send code</Button>
                  </CardFooter>
                </Card>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
