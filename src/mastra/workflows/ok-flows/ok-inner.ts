import { createStep, createWorkflow } from "@mastra/core";
import { z } from "zod";

const innerStep = createStep({
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
