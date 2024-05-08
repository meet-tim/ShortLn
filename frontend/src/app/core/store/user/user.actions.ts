import { PartialStateUpdater } from '@ngrx/signals';
import { IUserInterface } from './user.interface';
import { produce } from 'immer';

export function setUserNameAndEmail({
  name,
  email,
}: IUserInterface): PartialStateUpdater<IUserInterface> {
  return (baseState) => {
    return produce(baseState, (draft) => {
      draft.name = name;
      draft.email = email;
    });
  };
}
