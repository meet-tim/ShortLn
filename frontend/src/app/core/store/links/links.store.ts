import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { setAllLinks } from './links.actions';
import { ILinks, ILinksState } from './links.interface';

const initialState: ILinksState = {
  allLinks: [],
};

export const LinksStore = signalStore(
  { providedIn: 'root' },
  withDevtools('links'),
  withState(initialState),
  withMethods((store) => ({
    setAllLinks: (payload: ILinks[]) => {
      patchState(store, setAllLinks(payload));
    },
  })),
);
