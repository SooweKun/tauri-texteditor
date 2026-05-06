import { load } from '@tauri-apps/plugin-store';

type systemData = {
  path: string;
};

export const manageVaults = async (data: systemData) => {
  const store = await load('settings.json');
  const existingVaults = (await store.get<string[]>('vaults')) || [];

  if (!existingVaults.includes(data.path)) {
    const updateVaults = [...existingVaults, data.path];

    await store.set('vaults', updateVaults);
    await store.save();

    console.log('Обновленные пути:', updateVaults);
    return updateVaults;
  }

  console.log('Обновленные пути:', existingVaults);
  return existingVaults;
};
