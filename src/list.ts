import { screen, within } from "@testing-library/dom";
import { FindListFn } from "./types";

export const findList: FindListFn = async (parent = screen) => {
  const list = await parent.findByRole("list");

  return {
    element: list,
    items: () => within(list).getAllByRole("listitem"),
  };
};
