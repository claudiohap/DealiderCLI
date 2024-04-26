import { Schema, type InferSchemaType } from "mongoose";

const chatSchema = new Schema({
  openWindowDate: {
    type: Date,
    default: null,
  },
  id_empresa: {
    type: Number,
    validator: Number.isInteger,
    require: true,
  },
  id_lead: {
    type: Number,
    validator: Number.isInteger,
    require: true,
  },
  id_vendedor: {
    type: Number,
    validator: Number.isInteger,
    require: true,
  },
  numero_lead: {
    type: String,
    maxlength: 12 + 20,
    require: true,
  },
  numero_wab: {
    type: String,
    maxlength: 12 + 20,
    require: true,
  },
  nombre_empresa: { type: String, default: "" },
  room: { type: String, default: "" },
  bot: {
    enabled: { type: Boolean, default: false },
    step: { type: String, default: "initial" },
    fileName: { type: String, default: "test" },
  },
  historial: {
    type: [
      {
        body: { type: String, default: "" },
        from: { type: String, enum: ["user", "client", "bot"] },
        date: { type: Date, default: Date.now },
      },
    ],
    maxlength: 10,
    default: [],
  },
});

export type IChat = InferSchemaType<typeof chatSchema>;

export { chatSchema };
