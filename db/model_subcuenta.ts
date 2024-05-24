import { model } from "mongoose";
import { subcuentaSchema, type ISubcuenta } from "./schema_subcuenta";

export const Subcuenta = model<ISubcuenta>("SubAccount", subcuentaSchema);
