import { Command } from "commander";
import { conectarMongoDB } from "../utils/mongodb";
import { Chat } from "../db/model_chat";
import type { IChat } from "../db/schema_chat";
import CliTable3 from "cli-table3";

const comando_chats = new Command();

interface IOptionsChats {
  lead?: string;
  wab?: string;
}

comando_chats
  .name("chats")
  .description("Muestra todos los chats registrados")
  .option("-l --lead <NUMERO_LEAD>", "filtra por numero de lead")
  .option("-w --wab <NUMERO_WAB>", "filtra por el numero de wab")
  .action(async (options: IOptionsChats) => {
    await conectarMongoDB();
    await getAllChats(options);
    process.exit();
  });

const getAllChats = async (options: IOptionsChats) => {
  let chats = await Chat.find({}).select({
    id_lead: 1,
    id_empresa: 1,
    id_vendedor: 1,
    numero_lead: 1,
    numero_wab: 1,
    _id: 0,
    __v: -1,
  });

  if (chats.length <= 0) {
    console.log("[!] Base de datos vacia");
    return;
  }

  if (options.lead !== undefined) {
    chats = chats.filter((chat) =>
      chat.numero_lead?.includes(options.lead ?? "")
    );
  }

  if (options.wab !== undefined) {
    chats = chats.filter((chat) =>
      chat.numero_wab?.includes(options.wab ?? "")
    );
  }

  const tabla = new CliTable3({
    style: {
      head: ["green"],
    },
    head: ["WAB", "LEAD", "ID's"],
  });
  chats.map((chat: IChat) => {
    const numero_wab = chat.numero_wab?.replace("whatsapp:+", "");
    const numero_lead = chat.numero_lead?.replace("whatsapp:+", "");

    tabla.push([
      numero_wab,
      numero_lead,
      `E:${chat.id_empresa} L:${chat.id_lead} V:${chat.id_vendedor}`,
    ]);
  });
  console.log(tabla.toString());
};

export { comando_chats };
