import mongoose from "mongoose";

export const conectarMongoDB = async () => {
  try {
    const mongodb_uri = process.env.MONGODB_URI;
    if (!mongodb_uri) {
      throw new Error("URI de MongoDB no establecida");
    }
    await mongoose.connect(mongodb_uri);
    console.log("[+] Conectado a MongoDB");
  } catch (err) {
    console.error(`[-] Error al conectarse a MongoDB: ${err}`);
  }
};
