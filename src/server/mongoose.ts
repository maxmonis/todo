import mongoose from "mongoose"

interface TodoDoc {
  text: string
}

let todoSchema = new mongoose.Schema<TodoDoc>({
  text: { required: true, type: String },
})

export let db = {
  Todo:
    (mongoose.models.Todo as mongoose.Model<TodoDoc>) ??
    mongoose.model("Todo", todoSchema),
}

async function connectDB() {
  let mongoURI = process.env.MONGO_URI
  try {
    if (!mongoURI) throw Error("mongoURI not found")
    mongoose.set("strictQuery", false)
    await mongoose.connect(mongoURI)
    console.log("MongoDB connected")
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    process.exit(1)
  }
}

connectDB()
