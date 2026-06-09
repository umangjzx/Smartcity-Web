import mongoose from "mongoose";

function getMongoURI() {
  const uri = process.env.MONGODB_URI;
  return uri;
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoURI = getMongoURI();
    
    if (!mongoURI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongoURI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
