import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { errorWorkflow } from "./workflows/error-reproduce";
import { noSeparateFileForInnerFlowWorkflow } from "./workflows/ok-flows/comparisons/ok-no-separate-file-for-inner-flow";
import { importedStepWorkflow } from "./workflows/ok-flows/comparisons/ok-imported-step";
import { innerWorkflowWithImportedStepWorkflow } from "./workflows/ok-flows/comparisons/ok-inner-workflow-with-imported-step";
import { okWorkflow } from "./workflows/ok-flows/ok-flow";
import { errorWorkflowMinimal } from "./workflows/error-reproduce-minimal";

export const mastra = new Mastra({
  workflows: {
    // This is the actual workflow that reproduces the error.
    errorWorkflow,

    // This is a single-file version that reproduces the error.
    errorWorkflowMinimal,

    // This workflow does not reproduce the error, but is almost identical except for the import.
    okWorkflow,

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
