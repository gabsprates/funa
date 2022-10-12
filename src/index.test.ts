import { screen } from "@testing-library/dom";

import { sum } from ".";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("button should not be disabled", () => {
  document.body.innerHTML = `<button>click!</button>`;

  expect(screen.getByRole("button")).not.toBeDisabled();
});

test("button should be disabled", () => {
  document.body.innerHTML = `<button disabled>click!</button>`;

  expect(screen.getByRole("button")).toBeDisabled();
});
