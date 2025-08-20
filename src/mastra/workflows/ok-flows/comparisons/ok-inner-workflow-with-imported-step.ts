/**
 * This flow does not reproduce the error.
 * This flow has the same inner step as the inner workflow in the failing flow, and constructs the inner workflow inside the same file.
 */

import { createWorkflow } from "@mastra/core";
import z from "zod";
import { innerStep } from "../../error-inner";


const innerWorkflow = createWorkflow({
  id: "inner-workflow-with-imported-step",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(innerStep);

innerWorkflow.commit();

const innerWorkflowWithImportedStepWorkflow = createWorkflow({
  id: "imported-step-nested-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(innerWorkflow);

innerWorkflowWithImportedStepWorkflow.commit();

export { innerWorkflowWithImportedStepWorkflow };
