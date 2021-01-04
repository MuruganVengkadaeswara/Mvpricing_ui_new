import { render, screen } from "@testing-library/react";
import AllServices from "../components/AllServices/AllServices";
import React from "react";

test("renders All services", () => {
  render(<AllServices />);
});

test("check service name presence", () => {
  const { getByTestId } = render(<AllServices />);
  expect(getByTestId("tablemain")).toBeDefined();
});
