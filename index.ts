#! /usr/bin/env bun

import { program } from "commander";
import figlet from "figlet";
import {
  comando_historial,
  comando_limpiar_historial,
} from "./commands/historial_chats";
import chalk from "chalk";
import { comando_chats } from "./commands/chats";
import { comando_crear_subcuenta } from "./commands/subcuenta";

console.log(
  chalk.greenBright(
    figlet.textSync("Dealider CLI", {
      font: "Small Slant",
    })
  )
);

program
  .version("0.0.1")
  .description("Herramienta para tareas rapidas de Dealider");

program.addCommand(comando_historial);
program.addCommand(comando_limpiar_historial);
program.addCommand(comando_chats);
program.addCommand(comando_crear_subcuenta);

program.parseAsync();
