// import mongoose from "mongoose";

// const MONGODB_URI = 'mongodb+srv://shamilabdulla:YNs6k1lHwg6jEpH4@mondial.7whprj4.mongodb.net/?retryWrites=true&w=majority&appName=mondial' ;

// if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose
//       .connect(MONGODB_URI!, opts)
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default dbConnect;