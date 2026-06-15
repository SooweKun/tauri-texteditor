import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage('user-storage-key', {
  email: '',
  id: '',
  username: '',
  avatar: '',
  banner: '',
  status: '',
});
