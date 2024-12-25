// Connection to database
import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://bsainadh03:studycollege@cluster03.0s3fa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster03"
    )
    .then(() => console.log("Connected to database"));
};
