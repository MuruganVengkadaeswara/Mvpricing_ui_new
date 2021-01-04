import { screen, render } from "@testing-library/react";
import AddProduct from "../components/AddProduct/AddProduct";
import React from "react";

test("renders add product", () => {
  render(<AddProduct />);
});
