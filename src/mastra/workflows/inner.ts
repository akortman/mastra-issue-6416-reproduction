import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

export const innerStep = createStep({
  id: "inner-step",
  inputSchema: z.any(),
  outputSchema: z.any(),
  execute: async () => {
    return null;
  },
});

const innerWorkflow = createWorkflow({
  id: "debug-test-inner-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(innerStep);

innerWorkflow.commit();

export { innerWorkflow };
