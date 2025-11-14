import mongoose from "mongoose"
import { expect, it, vi } from "vitest"
import { db } from "~/server/db"
import { loadUser } from "./loadUser"
import { useAuthSession } from "./useAuthSession"

let mockUserId = new mongoose.Types.ObjectId().toString()

vi.mock("@tanstack/react-start", () => {
  return {
    createServerFn: vi.fn(() => {
      return {
        handler: vi.fn((cb: Function) => {
          return vi.fn(() => cb())
        }),
      }
    }),
  }
})
vi.mock("~/server/db")
vi.mock("./useAuthSession")

it("returns null if no session exists", async () => {
  vi.mocked(useAuthSession).mockResolvedValueOnce({
    clear: vi.fn(),
    data: {},
    id: "mockid",
    update: vi.fn(),
  })
  expect(await loadUser()).toBeNull()
})

it("clears session and returns null if user ID invalid", async () => {
  let clearSpy = vi.fn()
  vi.mocked(useAuthSession).mockResolvedValueOnce({
    clear: clearSpy,
    data: { userId: "invalid" },
    id: "mockid",
    update: vi.fn(),
  })
  expect(await loadUser()).toBeNull()
  expect(clearSpy).toHaveBeenCalledOnce()
})

it("clears session and returns null if user not found", async () => {
  let clearSpy = vi.fn()
  vi.mocked(useAuthSession).mockResolvedValueOnce({
    clear: clearSpy,
    data: { userId: mockUserId },
    id: "mockid",
    update: vi.fn(),
  })
  vi.mocked(db.User.findById).mockResolvedValueOnce(null)
  expect(await loadUser()).toBeNull()
  expect(db.User.findById).toHaveBeenCalledExactlyOnceWith(mockUserId)
  expect(clearSpy).toHaveBeenCalledOnce()
})

it("updates session and returns user if found", async () => {
  let updateSpy = vi.fn()
  vi.mocked(useAuthSession).mockResolvedValueOnce({
    clear: vi.fn(),
    data: { userId: mockUserId },
    id: "mockid",
    update: updateSpy,
  })
  vi.mocked(db.User.findById).mockResolvedValueOnce({
    email: "mock@valid.email",
  })
  expect(await loadUser()).toEqual({ email: "mock@valid.email" })
  expect(updateSpy).toHaveBeenCalledExactlyOnceWith({
    email: "mock@valid.email",
    userId: mockUserId,
  })
})
