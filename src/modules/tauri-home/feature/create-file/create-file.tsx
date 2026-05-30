import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { useCreateFile } from '../../hooks/create-file';

export const CreateFile = () => {
  const { mutate } = useCreateFile();

  const onSubmit = () => {
    // убрать потом
    mutate();
  };

  return (
    <div className='w-max h-max flex flex-col gap-5 relative'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => onSubmit()} variant='ghost'>
            +
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>create new file</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
