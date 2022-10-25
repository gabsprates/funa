import { BoundFunctions, queries } from "@testing-library/dom";

/**
 * General
 */

type ParentType = BoundFunctions<typeof queries>;

export type FindListFn = (parent?: ParentType) => Promise<IListElement>;
export type FindTableFn = (parent?: ParentType) => Promise<ITableElement>;

/**
 * List
 */

 export interface IListElement {
  element: HTMLElement;
  items: () => HTMLElement[];
}

/**
 * Table
 */

export interface ITableHeader {
  element: HTMLElement;
  columns: () => HTMLElement[];
}

export interface ITableRow {
  element: HTMLElement;
  columns: () => HTMLElement[];
}

export interface ITableElement {
  element: HTMLElement;
  header: ITableHeader;
  rows: () => ITableRow[];
}
