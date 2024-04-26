import { Command } from "commander";
import { conectarMongoDB } from "../utils/mongodb";
import { Chat } from "../db/model_chat";
import CliTable3 from "cli-table3";

const comando_historial = new Command();
const comando_limpiar_historial = new Command();

comando_historial
  .name("historial")
  .description("Obtiene el historial de un chat")
  .argument("<idEmpresa>", "ID de la empresa")
  .argument("<idLead>", "ID del lead")
  .argument("<idVendedor>", "ID del vendedor")
  .action(async (id_empresa: String, id_lead: String, id_vendedor: String) => {
    await conectarMongoDB();
    await obtenerChat(id_empresa, id_lead, id_vendedor);
    process.exit();
  });

comando_limpiar_historial
  .name("limpiarHistorial")
  .description("Limpia el historial de un chat")
  .argument("<idEmpresa>", "ID de la empresa")
  .argument("<idLead>", "ID del lead")
  .argument("<idVendedor>", "ID del vendedor")
  .action(async (id_empresa: String, id_lead: String, id_vendedor: String) => {
    await conectarMongoDB();
    await limpiarChat(id_empresa, id_lead, id_vendedor);
    process.exit();
  });

const obtenerChat = async (
  id_empresa: String,
  id_lead: String,
  id_vendedor: String
) => {
  try {
    const chat = await Chat.findOne({
      id_empresa,
      id_lead,
      id_vendedor,
    }).select({ historial: 1, _id: 0 });
    const historial = chat?.historial;

    if (historial && historial.length > 0) {
      const tabla = new CliTable3({
        head: ["De", "Mensaje", "Fecha"],
      });
      historial?.reverse().map((mensaje) => {
        const fecha = mensaje.date;

        tabla.push([mensaje.from, mensaje.body, fecha.toLocaleString()]);
      });
      console.log(tabla.toString());
    } else {
      console.log("[!] Historial vacio");
    }
  } catch (err) {
    console.error("[!!] Error al recolectar datos");
  }
};

const limpiarChat = async (
  id_empresa: String,
  id_lead: String,
  id_vendedor: String
) => {
  try {
    const chat = await Chat.findOne({
      id_empresa,
      id_lead,
      id_vendedor,
    });
    if (chat) {
      const resultado = await Chat.updateOne(
        {
          _id: chat.id,
        },
        {
          $set: { historial: [] },
        }
      );
      console.log("[+] El historial del chat ha sido limpiado");
      return;
    }
    console.log("[!] Chat no encontrado");
  } catch (err) {
    console.error(`[!] Error al borrar historial de un chat: ${err}`);
  }
};

export { comando_historial, comando_limpiar_historial };
