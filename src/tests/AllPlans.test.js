import { screen, render } from "@testing-library/react";
import AllPlans from "../components/AllPlans/AllPlans";
import React from "react";

test("render all plans", () => {
  render(<AllPlans />);
});
