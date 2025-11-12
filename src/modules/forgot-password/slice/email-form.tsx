import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';

type Props = {
  setValue: (value: string) => void;
  value: string;
};

export const EmailForm: FC<Props> = ({ setValue, value }) => {
  const sendEmail = () => {
    setValue('code');
    console.log('value', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email verification</CardTitle>
        <CardDescription>enter your work email so that we can send you a password change code.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='tabs-demo-name'>Name</Label>
          <Input id='tabs-demo-name' defaultValue='Pedro Duarte' />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={sendEmail}>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
