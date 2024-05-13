import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IThemeState } from './theme.interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { setTheme } from './theme.actions';

const initialState: IThemeState = {
  currentTheme: 'dark',
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withDevtools('theme'),
  withState(initialState),
  withMethods((store) => ({
    setTheme: (payload: 'light' | 'dark') => {
      patchState(store, setTheme(payload));
    },
  })),
);
