/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { FC, useEffect, useState } from 'react';

type Props = {
  TauriComponent: React.ReactNode;
  WebComponent: React.ReactNode;
};

export const RoutDispatcher: FC<Props> = ({ TauriComponent, WebComponent }) => {
  const [tauri, setTauri] = useState(false);

  useEffect(() => {
    console.log('use effect succes');
    if (window.isTauri) {
      setTauri(true);
      console.log('setTauri succes');
    }
  }, []);

  console.log('tauri', tauri);

  return <>{tauri ? TauriComponent : WebComponent}</>;
};
