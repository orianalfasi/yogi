import { describe, it, expect } from "vitest";
import { updateHysteresis, type HysteresisState } from "./hysteresis.ts";

describe("updateHysteresis", () => {
  it("reports failing only after 300ms", () => {
    let state: HysteresisState = {
      failing: false,
      pending: false,
      since: 0,
    };

    state = updateHysteresis(state, true, 0);
    expect(state.failing).toBe(false);

    state = updateHysteresis(state, true, 299);
    expect(state.failing).toBe(false);

    state = updateHysteresis(state, true, 300);
    expect(state.failing).toBe(true);
  });

  it("clears failing only after 300ms", () => {
    let state: HysteresisState = {
      failing: false,
      pending: false,
      since: 0,
    };

    state = updateHysteresis(state, true, 0);
    state = updateHysteresis(state, true, 300);

    state = updateHysteresis(state, false, 300);
    expect(state.failing).toBe(true);

    state = updateHysteresis(state, false, 599);
    expect(state.failing).toBe(true);

    state = updateHysteresis(state, false, 600);
    expect(state.failing).toBe(false);
  });

  it("keeps failing when clearing is interrupted", () => {
    let state: HysteresisState = {
      failing: false,
      pending: false,
      since: 0,
    };

    state = updateHysteresis(state, true, 0);
    state = updateHysteresis(state, true, 300);

    state = updateHysteresis(state, false, 1000);
    expect(state.failing).toBe(true);

    state = updateHysteresis(state, true, 1200);
    expect(state.failing).toBe(true);
    expect(state.pending).toBe(true);
    expect(state.since).toBe(1200);
  });
});
