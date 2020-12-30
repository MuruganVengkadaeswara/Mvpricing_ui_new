import { screen, render } from "@testing-library/react";
import AddProduct from "../components/AddProduct/AddProduct";

test("renders add product", () => {
  render(<AddProduct />);
});
