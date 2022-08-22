import mongoose from "mongoose";

const tasks = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

export default mongoose.model("tasks", tasks);
