//mongodb://localhost:27017/
import mongoose from "mongoose";
import colors from "colors";
export const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected on port 5000".bgMagenta.white);
  } catch (err) {
    console.error(err.bgRed.white);
  }
};
