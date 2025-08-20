/**
 * This flow does not reproduce the error.
 * This flow has the same inner step as the inner workflow in the failing flow, but has no nested workflow.
 */

import { createWorkflow } from "@mastra/core";
import z from "zod";
import { innerStep } from "../inner";

const importedStepWorkflow = createWorkflow({
  id: "imported-step-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(innerStep);

importedStepWorkflow.commit();

export { importedStepWorkflow };
