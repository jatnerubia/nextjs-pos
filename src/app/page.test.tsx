import Page from "@/app/page"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Page", () => {
  it("should render correctly", () => {
    render(<Page />)
    expect(screen.getByText("Hey")).toBeDefined()
  })
})
