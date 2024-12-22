import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface SpinnerState {
  isLoading: boolean;
}

const initialState: SpinnerState = {
  isLoading: false
};

export const useSpinnerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    showLoading() {
      patchState(store, { isLoading: true });
    },
    hideLoading() {
      patchState(store, { isLoading: false });
    }
  }))
);
