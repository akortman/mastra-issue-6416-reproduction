/**
 * This flow does not reproduce the error.
 * This flow has the same innerWorkflow structure but all in one file.
 */

import { createStep, createWorkflow } from "@mastra/core";
import z from "zod";

const innerWorkflow = createWorkflow({
  id: "debug-test-inner-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(
  createStep({
    id: "inner-step",
    inputSchema: z.any(),
    outputSchema: z.any(),
    execute: async () => {
      return null;
    },
  })
);

innerWorkflow.commit();

const noSeparateFileForInnerFlowWorkflow = createWorkflow({
  id: "ok-no-separate-file-for-inner-flow",
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(innerWorkflow);

noSeparateFileForInnerFlowWorkflow.commit();

export { noSeparateFileForInnerFlowWorkflow };
