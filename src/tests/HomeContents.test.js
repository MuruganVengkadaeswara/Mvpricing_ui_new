import { screen, render } from "@testing-library/react";
import HomeContents from "../components/HomeContents/HomeContents";
import React from "react";

test("renders HomeContents", () => {
  render(<HomeContents />);
});
