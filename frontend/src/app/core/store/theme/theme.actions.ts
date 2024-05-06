import { PartialStateUpdater } from '@ngrx/signals';
import { IThemeState } from './theme.interface';
import { produce } from 'immer';

export function setTheme(
  theme: 'light' | 'dark'
): PartialStateUpdater<IThemeState> {
  return (baseState) => {
    return produce(baseState, (draft) => {
      draft.currentTheme = theme;
    });
  };
}
