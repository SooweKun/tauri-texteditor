import { Button } from '@/src/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { useCreateFile } from '../../hooks/create-file';

export const CreateFile = () => {
  const { mutate } = useCreateFile();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => mutate('test4')} variant='ghost'>
          +
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom'>
        <p>create new file</p>
      </TooltipContent>
    </Tooltip>
  );
};
