import { screen, render } from "@testing-library/react";
import MainNavBar from "../components/NavBar/MainNavbar";
import React from "react";

test("renders mainNavBar", () => {
  render(<MainNavBar />);
});
