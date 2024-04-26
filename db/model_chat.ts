import { model } from "mongoose";
import { chatSchema, type IChat } from "./schema_chat";

export const Chat = model<IChat>("Chat", chatSchema);
