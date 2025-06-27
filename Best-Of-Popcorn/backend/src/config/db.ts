//Bu dosya, Express uygulamanızın MongoDB Atlas veritabanına bağlanmasını sağlayacak.

//----------GEREKLİ KÜTÜPHANELER------------
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI: string | undefined = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!mongoURI) {
      console.log("DB URL YOK");
      return;
    }
    await mongoose.connect(mongoURI);
    console.log("Başarıyla Bağlanıldı");
  } catch (error) {
    console.log("Bağlantı Hatası");
  }
};

export default connectDB;
