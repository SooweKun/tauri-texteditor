'use client';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/src/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/src/components/ui/input-otp';
import { useVerificationForm } from '@/src/modules/verification/hooks/use-verif-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

const CodeFormSchema = z.object({
  code: z.string().length(6, {
    message: 'Ваш одноразовый код должен состоять из 6 символов.',
  }),
});

type CodeFormType = z.infer<typeof CodeFormSchema>;

export const VerificationForm = () => {
  const form = useForm<CodeFormType>({
    resolver: zodResolver(CodeFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      code: '',
    },
  });

  const { mutate } = useVerificationForm();
  const searchParams = useSearchParams();
  const flowId = searchParams.get('flow_id');

  const sendCode = (data: CodeFormType) => {
    const test = {
      ...data,
      flow_id: flowId as string,
    };

    console.log(test, 'verif test code ');

    mutate(test);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendCode)} className='space-y-6'>
        <FormField
          control={form.control}
          name='code'
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
