import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema({
  userId: String,
  jobId: String,
  title: String,
  company: String,
});

export default mongoose.models.SavedJob ||
  mongoose.model("SavedJob", SavedJobSchema);