import { Command } from "commander";
import { conectarMongoDB } from "../utils/mongodb";
import { Subcuenta } from "../db/model_subcuenta";

const comando_crear_subcuenta = new Command();
// const ver_todo_subcuenta = new Command();

comando_crear_subcuenta
  .name("crearSubcuenta")
  .description("Crea una nueva subcuenta")
  .argument("<idEmpresa>", "Id de la empresa")
  .argument("<nombre>", "Nombre de la empresa")
  .argument("<sid>", "sid Token de Twilio")
  .argument("<auth>", "auth Token de Twilio")
  .argument("<service>", "ID de los servicios de twilio")
  .argument("<idTemplate>", "ID del template de mensaje inicial")
  .action(
    async (
      idEmpresa: Number,
      nombre: String,
      sid: String,
      auth: String,
      service: String,
      idTemplate: String
    ) => {
      await conectarMongoDB();
      await crearSubcuenta(idEmpresa, nombre, sid, auth, service, idTemplate);
      process.exit();
    }
  );

const crearSubcuenta = async (
  idEmpresa: Number,
  nombre: String,
  sid: String,
  auth: String,
  service: String,
  idTemplate: String
) => {
  try {
    const chat = new Subcuenta({
      id_empresa: idEmpresa,
      nombre: nombre,
      sid: sid,
      auth: auth,
      service: service,
      idTemplate: idTemplate,
    });
    await chat.save();
    console.log("[+] Subcuenta registrada");
  } catch (err) {
    console.error(err);
  }
};

export { comando_crear_subcuenta };
