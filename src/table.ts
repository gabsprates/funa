import { screen, within } from "@testing-library/dom";
import { FindTableFn, ITableHeader, ITableRow } from "./types";

export const findTable: FindTableFn = async (parent = screen) => {
  const table = await parent.findByRole("table");

  const [thead, tbody] = within(table).getAllByRole("rowgroup");

  return {
    element: table,
    header: makeTableHeader(thead),
    rows: () => {
      return within(tbody)
        .getAllByRole("row")
        .map((row) => makeTableRow(row));
    },
  };
};

const makeTableHeader = (thead: HTMLElement): ITableHeader => {
  return {
    element: thead,
    columns: () => {
      return within(thead).getAllByRole("columnheader");
    },
  };
};

const makeTableRow = (row: HTMLElement): ITableRow => {
  return {
    element: row,
    columns: () => {
      return within(row).getAllByRole("cell");
    },
  };
};
