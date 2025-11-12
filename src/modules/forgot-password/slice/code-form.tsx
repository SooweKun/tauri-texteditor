import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/src/components/ui/input-otp';
import { FC } from 'react';

type Props = {
  setValue: (value: string) => void;
  value: string;
};

export const CodeForm: FC<Props> = ({ setValue, value }) => {
  const sendCode = () => {
    setValue('password');
    console.log('value', value);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code verification</CardTitle>
        <CardDescription>enter the code that we have sent to your email</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full flex justify-center'>
          <InputOTP maxLength={6}>
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
      </CardContent>
      <CardFooter>
        <Button onClick={sendCode}>Send code</Button>
      </CardFooter>
    </Card>
  );
};
