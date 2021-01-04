import { screen, render } from "@testing-library/react";
import AllProducts from "../components/AllProducts/AllProducts";
import React from "react";

test("renders All Products", () => {
  render(<AllProducts />);
});
