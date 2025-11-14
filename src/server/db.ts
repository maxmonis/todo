import mongoose from "mongoose"
import { connectDB } from "./connectDB"

interface TodoDoc {
  checked?: boolean
  text: string
  userId: mongoose.Schema.Types.ObjectId
}

interface UserDoc {
  email: string
}

let todoSchema = new mongoose.Schema<TodoDoc>({
  checked: { type: Boolean },
  text: { required: true, type: String },
  userId: { ref: "User", required: true, type: mongoose.Schema.Types.ObjectId },
})

let userSchema = new mongoose.Schema<UserDoc>({
  email: { required: true, type: String },
})

export let db = {
  Todo:
    (mongoose.models.Todo as mongoose.Model<TodoDoc>) ??
    mongoose.model("Todo", todoSchema),
  User:
    (mongoose.models.User as mongoose.Model<UserDoc>) ??
    mongoose.model("User", userSchema),
}

connectDB()
