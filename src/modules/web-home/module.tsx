'use client';
import icon from '@/public/tauri-icon.svg';
import CustomCursor from '@/src/components/feature/custom-cursor';
import { WebHeaderLayout } from '@/src/components/layouts/web-header-layout';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/src/components/ui/sheet';
import { useState } from 'react';
import { Animate } from './feature/animate';
import { PurpleColumnsHero } from './feature/bezie';
import { Tile } from './feature/tile';

const cardsData = [
  {
    title: 'Ваши мысли принадлежат только вам.',
    description:
      'Obsidian хранит заметки локально на вашем устройстве, обеспечивая быстрый доступ к ним даже без подключения к интернету. Никто, кроме вас, не сможет их прочитать — даже мы.',
    gradientFrom: 'from-[#F93B86]',
    gradientVia: 'via-[#EC4899]',
    gradientTo: 'to-[#F97316]',
    ico: icon,
  },
  {
    title: 'Ваш разум уникален.',
    description:
      'Связывайте идеи так, как думаете именно вы. Никаких жестких шаблонов и сторонних серверов — только гибкая локальная система для вашей личной базы знаний.',
    gradientFrom: 'from-[#00C6FF]',
    gradientVia: 'via-[#0072FF]',
    gradientTo: 'to-[#00F5D4]',
    ico: icon,
  },
  {
    title: 'Ваши знания должны сохраняться надолго.',
    description:
      'Arima использует открытые форматы файлов, поэтому вы не привязаны к конкретной программе. Ваши данные остаются под вашим полным контролем.',
    gradientFrom: 'from-[#6366F1]',
    gradientVia: 'via-[#8B5CF6]',
    gradientTo: 'to-[#EC4899]',
    ico: icon,
  },
  {
    title: 'Мгновенная скорость работы.',
    description:
      'Поскольку все файлы хранятся локально на вашем устройстве, приложение запускается за доли секунды и работает плавно даже с тысячами заметок. Забудьте о долгих загрузках и ожиданиях ответа от серверов.',
    gradientFrom: 'from-[#10B981]',
    gradientVia: 'via-[#059669]',
    gradientTo: 'to-[#34D399]',
    ico: icon,
  },
  {
    title: 'Находите нужные связи за секунды.',
    description:
      'Мгновенный полнотекстовый поиск и система быстрых переходов позволяют находить затерянные идеи даже в архиве из десятков тысяч заметок.',
    gradientFrom: 'from-[#F59E0B]',
    gradientVia: 'via-[#D97706]',
    gradientTo: 'to-[#FBBF24]',
    ico: icon,
  },
  {
    title: 'Простая и привычная структура.',
    description:
      'Структурируйте свои знания без лишней сложности. Объединяйте заметки в папки для строгого порядка или используйте гибкую систему тегов для быстрого поиска контекста.',
    gradientFrom: 'from-[#3B82F6]',
    gradientVia: 'via-[#2563EB]',
    gradientTo: 'to-[#60A5FA]',
    ico: icon,
  },
];

export const WebHomeModule = () => {
  const [isInsideAnimate, setIsInsideAnimate] = useState(false);
  const [isOverText, setIsOverText] = useState(false);

  const renderDetailBlock = (ico: string) => {
    switch (ico) {
      case 'test1':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Как это устроено?</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-pink-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Файлы на вашем диске</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Все заметки хранятся локально в обычной системной папке. Никаких скрытых или проприетарных баз данных.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-pink-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Полный офлайн-режим</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Программе не требуется подключение к интернету для чтения, поиска или редактирования файлов.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'test2':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Гибкость структуры</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-cyan-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Ассоциативные связи</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Используйте двусторонние ссылки для объединения идей в единый цифровой граф вместо жесткой иерархии папок.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-cyan-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Персонализация под вас</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>Настраивайте систему ведения записей так, как это удобно вашему мышлению.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'test3':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Долговечность</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-purple-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Формат plain-text</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Записи сохраняются в стандартном формате Markdown. Их можно будет открыть любым текстовым редактором через десятки лет.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-purple-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Легкий перенос</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Ваши файлы не привязаны к конкретному софту, что позволяет при необходимости перенести их в другую экосистему в пару
                      кликов.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'test4':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Высокая производительность</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-emerald-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Мгновенный старт.</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Приложению не требуется соединение с интернетом, поэтому оно готово к работе сразу после открытия.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-emerald-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Экономия ресурсов.</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Программа потребляет минимум оперативной памяти вашего компьютера или телефона, не замедляя общую работу системы.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'test5':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Поиск и навигация</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-amber-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Мгновенный поиск</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Быстро находите нужные фрагменты информации по всей базе данных благодаря оптимизированному механизму поиска.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-amber-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Командная палитра</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Управляйте всеми функциями приложения горячими клавишами, выполняя любые действия без использования мыши.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'test6':
        return (
          <div className='mt-8 space-y-6 text-left'>
            <div className='border-t border-zinc-800 pt-6'>
              <h4 className='text-sm font-semibold text-white uppercase tracking-wider mb-3'>Систематизация</h4>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-indigo-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Привычная иерархия.</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Создавайте вложенные папки так же, как вы делаете это в обычном проводнике Windows или Finder на Mac.
                    </p>
                  </div>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-indigo-500 mt-1'>✔</span>
                  <div>
                    <p className='font-medium text-zinc-200 text-sm'>Быстрая группировка.</p>
                    <p className='text-zinc-400 text-xs mt-0.5'>
                      Помечайте заметки тегами, чтобы в один клик находить все связанные мысли из абсолютно разных папок и проектов.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <WebHeaderLayout>
      <div className='text-white flex flex-col bg-black'>
        <div className='flex w-full mt-[130px] justify-center items-center'>
          <CustomCursor isInsideAnimate={isInsideAnimate} isOverText={isOverText} />
          <Animate
            isInsideAnimate={isInsideAnimate}
            setIsInsideAnimate={setIsInsideAnimate}
            isOverText={isOverText}
            setIsOverText={setIsOverText}
          />
        </div>
        <div className='mt-[120px] bg-black '>
          <div className='flex flex-col gap-[20px] pl-[85px]'>
            <h1 className='text-6xl font-bold'>Оттачивайте свое мышление.</h1>
            <p className='text-4xl text-gray-500 '>
              Бесплатное и гибкое приложение <br /> для ваших личных мыслей.
            </p>
            <a
              href='/apk-file/app.exe'
              download='arima.exe'
              className='relative overflow-hidden flex items-center justify-center group w-[280px] h-[60px] text-xl text-white bg-[#7C3AED] rounded-[6px] cursor-pointer mt-[20px] transition-transform active:scale-[0.98]'>
              <span
                className='absolute inset-y-0 -left-[100%] w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[25deg] transition-all duration-1000 ease-out group-hover:left-[100%]'
                aria-hidden='true'
              />
              <span className='relative z-10'>Скачать</span>
            </a>
          </div>
          <div className='h-[700px] mt-[80px] bg-black flex flex-col items-center p-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center h-max'>
              {cardsData.map((card, idx) => (
                <Sheet key={idx}>
                  <SheetTrigger asChild>
                    <div className='w-full cursor-pointer focus-visible:outline-none transition-all duration-300 active:scale-[0.99] h-max'>
                      <Tile {...card} />
                    </div>
                  </SheetTrigger>
                  <SheetContent side='right' className='bg-[#09090b] border-zinc-800 text-white w-full sm:max-w-[450px] p-6 overflow-y-auto'>
                    <SheetHeader className='space-y-3'>
                      <SheetTitle className='text-xl font-bold text-white text-left leading-tight'>{card.title}</SheetTitle>
                      <SheetDescription className='text-zinc-400 text-sm text-left leading-relaxed pt-2'>{card.description}</SheetDescription>
                    </SheetHeader>
                    {renderDetailBlock(card.ico)}
                  </SheetContent>
                </Sheet>
              ))}
            </div>
            <div className='w-full flex justify-center mt-[30px]'>
              <p className='text-xl text-gray-500'>Пришло время блистать.</p>
            </div>
          </div>
          <PurpleColumnsHero />
        </div>
      </div>
    </WebHeaderLayout>
  );
};
