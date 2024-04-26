#! /usr/bin/env bun

import { program } from "commander";
import figlet from "figlet";
import {
  comando_historial,
  comando_limpiar_historial,
} from "./commands/historial_chats";
import chalk from "chalk";

console.log(
  chalk.greenBright(
    figlet.textSync("Dealider CLI", {
      font: "ANSI Shadow",
    })
  )
);

program
  .version("0.0.1")
  .description("Herramienta para tareas rapidas de Dealider");

program.addCommand(comando_historial);
program.addCommand(comando_limpiar_historial);

program.parseAsync();
