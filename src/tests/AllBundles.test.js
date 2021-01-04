import { render, screen } from "@testing-library/react";
import AllBundles from "../components/AllBundles/AllBundles";
import React from "react";

test("renders all bundles", () => {
  render(<AllBundles />);
});
