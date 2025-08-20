import { createStep, createWorkflow } from "@mastra/core/workflows"; // Error caused by this import!
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
  id: "inner-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
}).then(innerStep);

innerWorkflow.commit();

export { innerWorkflow };
