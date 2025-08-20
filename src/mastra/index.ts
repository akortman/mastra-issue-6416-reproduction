import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { errorWorkflow } from "./workflows/error-flow";
import { noSeparateFileForInnerFlowWorkflow } from "./workflows/ok-flows/ok-no-separate-file-for-inner-flow";
import { importedStepWorkflow } from "./workflows/ok-flows/ok-imported-step";
import { innerWorkflowWithImportedStepWorkflow } from "./workflows/ok-flows/ok-inner-workflow-with-imported-step";

export const mastra = new Mastra({
  workflows: {
    // This is the actual workflow that reproduces the error.
    errorWorkflow,

    // The workflows below all do not reproduce the error.
    // They are very similar to the failing flow, and may be useful for investigations.
    noSeparateFileForInnerFlowWorkflow,
    importedStepWorkflow,
    innerWorkflowWithImportedStepWorkflow,
  },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
