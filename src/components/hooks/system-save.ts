import { load } from '@tauri-apps/plugin-store';

export type systemData = {
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

export const getCurrentVault = async (): Promise<string | null> => {
  const store = await load('settings.json');
  const currentVault = await store.get<string>('currentVault');
  console.log(currentVault, 'Текущее хранилище установлено');

  return currentVault || null;
};

export const setCurrentVault = async (data: string) => {
  const store = await load('settings.json');
  await store.set('currentVault', data);
  await store.save();
  console.log('Текущее хранилище установлено:', data);
};

export const getStarredFiles = async (): Promise<systemData[]> => {
  const store = await load('settings.json');
  const starred = await store.get<systemData[]>('starredFiles');
  return starred || [];
};

export const setStarredFiles = async (data: systemData) => {
  try {
    const store = await load('settings.json');
    const existingStarred = (await store.get<systemData[]>('starredFiles')) || [];

    const isAlreadyStarred = existingStarred.some((star) => star.path === data.path);

    let updateStars: systemData[];

    if (isAlreadyStarred) {
      updateStars = existingStarred.filter((star) => star.path !== data.path);
      console.log('Файл удален из избранного:', data.path);
    } else {
      const newStar = { ...data, isStarred: true };
      updateStars = [...existingStarred, newStar];
      console.log('Файл добавлен в избранное:', data.path);
    }

    await store.set('starredFiles', updateStars);
    await store.save();

    return updateStars;
  } catch (error) {
    console.error('Ошибка при сохранении в Store:', error);
    throw error;
  }
};
