export type HysteresisState = {
  failing: boolean;
  pending: boolean;
  since: number;
};

export function updateHysteresis(
  state: HysteresisState,
  failing: boolean,
  now: number,
  holdMs = 300,
): HysteresisState {
  if (failing !== state.pending) {
    return {
      failing: state.failing,
      pending: failing,
      since: now,
    };
  }

  if (now - state.since >= holdMs) {
    return {
      failing: state.pending,
      pending: state.pending,
      since: state.since,
    };
  }

  return { ...state };
}
