import mongoose, {
  Schema,
  Model,
  ObjectId,
  Mongoose,
  Document,
} from "mongoose";
import User from "./User";

export interface IReview extends Document {
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    movieId: {
      type: Number,
      required: true,
      index: true,
    },
    userId: {
      ref: User,
      type: mongoose.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
