import { screen, within } from "@testing-library/dom";
import { findTable } from "./table";

describe("findTable", () => {
  const templates = {
    empty: `
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    `,
    withHeader: `
        <table>
            <thead>
                <tr>
                    <th>header 0</th>
                    <th>header 1</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `,
    withOneCellRows: `
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <td>row 0 | cell 0</td>
                </tr>
                <tr>
                    <td>row 1 | cell 0</td>
                </tr>
            </tbody>
        </table>
    `,
    withSomeCellRows: `
        <table>
            <thead></thead>
            <tbody>
                <tr>
                    <td>row 0 | cell 0</td>
                    <td>row 0 | cell 1</td>
                </tr>
                <tr>
                    <td>row 1 | cell 0</td>
                    <td>row 1 | cell 1</td>
                </tr>
            </tbody>
        </table>
    `,
  };

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("element containers", () => {
    it("should find the table element in document", async () => {
      document.body.innerHTML = templates.empty;

      const tableElement = await findTable();

      expect(tableElement.element).toBeInTheDocument();
    });

    it("should find the table element in container", async () => {
      const container = document.createElement("div");
      container.innerHTML = templates.empty;

      const tableElement = await findTable(within(container));

      expect(tableElement.element).toBe(container.firstElementChild);
    });
  });

  describe("table header", () => {
    it("should return the table cells in right order", async () => {
      document.body.innerHTML = templates.withHeader;

      const tableElement = await findTable();
      const [header0, header1] = tableElement.header.columns();

      expect(header0).toHaveTextContent("header 0");
      expect(header1).toHaveTextContent("header 1");
    });
  });

  describe("table rows", () => {
    it("should return the table rows in right order", async () => {
      document.body.innerHTML = templates.withOneCellRows;

      const tableElement = await findTable();
      const [row0, row1] = tableElement.rows();

      expect(row0.element).toHaveTextContent("row 0 | cell 0");
      expect(row1.element).toHaveTextContent("row 1 | cell 0");
    });

    it("should return the table row cells in right order", async () => {
      document.body.innerHTML = templates.withSomeCellRows;

      const tableElement = await findTable();
      const [row0, row1] = tableElement.rows();

      const [row0column0, row0column1] = row0.columns();
      expect(row0column0).toHaveTextContent("row 0 | cell 0");
      expect(row0column1).toHaveTextContent("row 0 | cell 1");

      const [row1column0, row1column1] = row1.columns();
      expect(row1column0).toHaveTextContent("row 1 | cell 0");
      expect(row1column1).toHaveTextContent("row 1 | cell 1");
    });
  });
});
