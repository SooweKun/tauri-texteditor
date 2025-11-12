'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { CodeForm } from '../slice/code-form';
import { EmailForm } from '../slice/email-form';
import { PasswordForm } from '../slice/password-form';

// потом можно до колбеков рефакторнуть но будетразделение на компачи да и ваще так лучше читаемость

export function TabsForm() {
  const [value, setValue] = useState('email');

  return (
    <Tabs value={value} className='w-full max-w-[400px] min-w-[300px]'>
      <TabsList className='pointer-events-none'>
        <TabsTrigger value='email'>Email</TabsTrigger>
        <TabsTrigger value='code'>Code</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='email'>
        <EmailForm setValue={setValue} value={value} />
      </TabsContent>
      <TabsContent value='code'>
        <CodeForm setValue={setValue} value={value} />
      </TabsContent>
      <TabsContent value='password'>
        <PasswordForm setValue={setValue} value={value} />
      </TabsContent>
    </Tabs>
  );
}
