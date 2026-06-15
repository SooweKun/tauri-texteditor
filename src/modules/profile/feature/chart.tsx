'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';

const chartData = [
  { month: 'Январь', desktop: 186 },
  { month: 'Февраль', desktop: 305 },
  { month: 'Март', desktop: 237 },
  { month: 'Апрель', desktop: 273 },
  { month: 'Май', desktop: 209 },
  { month: 'Июнь', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#AE0389',
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card className='gap-0 bg-transparent border-none'>
      <CardContent className='p-0'>
        <ChartContainer config={chartConfig} className='w-[280px] aspect-square max-h-[250px] flex flex-col'>
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='month' />
            <PolarGrid />
            <Radar
              dataKey='desktop'
              fill='var(--color-desktop)'
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='w-full flex flex-col items-center'>
        <h1 className='text-sm'>статистика использования</h1>
        <p className='text-xs underline underline-offset-1 text-[#AE0389] cursor-pointer'>see more.</p>
      </CardFooter>
    </Card>
  );
}
