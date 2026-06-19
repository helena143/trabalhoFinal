import mongoose, { Schema, Document } from "mongoose";

export interface ICasamento extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  createdAt: Date;
}

const CasamentoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "Casamento",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICasamento>(
  "Casamento",
  CasamentoSchema,
  "casamento"
);