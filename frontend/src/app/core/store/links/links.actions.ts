import { PartialStateUpdater } from '@ngrx/signals';
import { ILinks, ILinksState } from './links.interface';
import { produce } from 'immer';

export function setAllLinks(links: ILinks[]): PartialStateUpdater<ILinksState> {
  return (baseState) => {
    return produce(baseState, (draft) => {
      draft.allLinks = links;
    });
  };
}
