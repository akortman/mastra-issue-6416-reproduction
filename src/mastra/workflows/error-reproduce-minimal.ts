/**
 * Reproduce the bug in a single file for demonstration purposes.
 */

import { createWorkflow } from "@mastra/core";
import {
  createStep as altCreateStep,
  createWorkflow as altCreateWorkflow,
} from "@mastra/core/workflows";
import { z } from "zod";

const innerWorkflow = altCreateWorkflow({
  id: "inner-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(
  altCreateStep({
    id: "inner-step",
    inputSchema: z.any(),
    outputSchema: z.any(),
    execute: async () => {
      return null;
    },
  })
);

innerWorkflow.commit();

const errorWorkflowMinimal = createWorkflow({
  id: "error-workflow-minimal",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(innerWorkflow);

errorWorkflowMinimal.commit();

export { errorWorkflowMinimal };
