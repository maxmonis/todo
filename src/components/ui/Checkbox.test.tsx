import { fireEvent, render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { Checkbox } from "./Checkbox"

it("displays checked state", () => {
  let { rerender } = render(
    <Checkbox checked={false} label="mock label" onChange={vi.fn()} />,
  )
  expect(screen.getByLabelText("mock label").getAttribute("aria-checked")).toBe(
    "false",
  )
  rerender(<Checkbox checked label="mock label" onChange={vi.fn()} />)
  expect(screen.getByLabelText("mock label").getAttribute("aria-checked")).toBe(
    "true",
  )
})

it("calls onChange when toggled", async () => {
  let onChangeSpy = vi.fn()
  render(<Checkbox checked label="mock label" onChange={onChangeSpy} />)
  fireEvent.click(screen.getByLabelText("mock label"))
  expect(onChangeSpy).toHaveBeenCalledOnce()
})

it("displays loading state", () => {
  render(<Checkbox checked label="mock label" loading onChange={vi.fn()} />)
  let checkbox = screen.getByLabelText("mock label")
  expect(checkbox.getAttribute("aria-checked")).toBe("mixed")
  expect(checkbox).toBeDisabled()
})

it("displays disabled state", () => {
  render(<Checkbox checked disabled label="mock label" onChange={vi.fn()} />)
  expect(screen.getByLabelText("mock label")).toBeDisabled()
})
