import { render, screen } from "@testing-library/react";
import AddService from "../components/AddService/AddService";
import React from "react";

test("renders Add service", () => {
  render(<AddService />);
});
