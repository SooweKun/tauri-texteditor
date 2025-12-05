import { TanstackProvider } from '../components/layouts/tanstack-provider';
import { ThemeProvider } from '../components/providers/theme-provider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <TanstackProvider>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

// такс мне надо сделать лев компонент для одного лайаута потом правый компонент для того же лайаута и верхние элементы будут в верхней строке :/
