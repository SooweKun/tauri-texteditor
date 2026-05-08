import { load } from '@tauri-apps/plugin-store';

type systemData = {
  path: string;
  name: string;
};

export const getVaults = async (): Promise<systemData[]> => {
  const store = await load('settings.json');
  const vaults = await store.get<systemData[]>('vaults');
  console.log(vaults);

  return vaults || [];
};

export const setVaults = async (data: systemData) => {
  const store = await load('settings.json');
  const existingVaults = (await store.get<systemData[]>('vaults')) || [];
  const isAlreadyExists = existingVaults.some((vault) => vault.path === data.path);

  if (!isAlreadyExists) {
    const updateVaults = [...existingVaults, data];

    await store.set('vaults', updateVaults);
    await store.save();

    console.log('Обновленные пути:', updateVaults);
    return updateVaults;
  } else {
    console.log('имя с таким хранидищем уже существует');
  }

  console.log('existingVaults:', existingVaults);
  return existingVaults;
};
