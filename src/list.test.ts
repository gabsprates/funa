import { within } from "@testing-library/dom";
import { findList } from "./list";

describe("findList", () => {
  const templates = {
    ulList: `
      <ul>
      </ul>
    `,
    olList: `
      <ol>
      </ol>
    `,
    empty: `
        <ul>
        </ul>
    `,
    withOneItem: `
        <ul>
          <li>item 0</li>
        </ul>
    `,
    withSomeItems: `
        <ul>
          <li>item 0</li>
          <li>item 1</li>
        </ul>
    `,
  };

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("list types", () => {
    it("should find the UL element as the list", async () => {
      document.body.innerHTML = templates.ulList;

      const listElement = await findList();

      expect(listElement.element).toBeInTheDocument();
    });

    it("should find the OL element as the list", async () => {
      document.body.innerHTML = templates.olList;

      const listElement = await findList();

      expect(listElement.element).toBeInTheDocument();
    });
  });

  describe("element containers", () => {
    it("should find the list element in document", async () => {
      document.body.innerHTML = templates.empty;

      const listElement = await findList();

      expect(listElement.element).toBeInTheDocument();
    });

    it("should find the list element in container", async () => {
      const container = document.createElement("div");
      container.innerHTML = templates.empty;

      const listElement = await findList(within(container));

      expect(listElement.element).toBe(container.firstElementChild);
    });
  });

  describe("list items", () => {
    it("should return one list item", async () => {
      document.body.innerHTML = templates.withOneItem;

      const listElement = await findList();
      const items = listElement.items();

      expect(items).toHaveLength(1);
      expect(items[0]).toHaveTextContent("item 0");
    });

    it("should return two list items in right order", async () => {
      document.body.innerHTML = templates.withSomeItems;

      const listElement = await findList();
      const items = listElement.items();

      expect(items[0]).toHaveTextContent("item 0");
      expect(items[1]).toHaveTextContent("item 1");
    });
  });
});
