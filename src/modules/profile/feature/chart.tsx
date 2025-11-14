'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
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
        <h1 className='text-sm'>app activity statistics</h1>
        <p className='text-xs underline underline-offset-1 text-[#AE0389] cursor-pointer'>see more.</p>
      </CardFooter>
    </Card>
  );
}
