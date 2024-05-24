import { Schema, type InferSchemaType } from "mongoose";

const subcuentaSchema = new Schema({
  id_empresa: {
    type: Number,
    require: true,
    validator: Number.isInteger,
  },
  nombre: {
    type: String,
    require: true,
  },
  sid: {
    type: String,
    require: true,
  },
  auth: {
    type: String,
    require: true,
  },
  service: {
    type: String,
  },
  idTemplate: {
    type: String,
  },
});

export type ISubcuenta = InferSchemaType<typeof subcuentaSchema>;

export { subcuentaSchema };
