import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IUserInterface } from './user.interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { setUserNameAndEmail } from './user.actions';

const initialState: IUserInterface = {
  email: '',
  name: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withDevtools('user'),
  withState(initialState),
  withMethods((store) => ({
    setUserNameAndEmail: (payload: IUserInterface) => {
      patchState(store, setUserNameAndEmail(payload));
    },
  })),
);
