/**
 * This is the actual failing workflow to reproduce the bug.
 */

import { createWorkflow } from "@mastra/core";
import z from "zod";
import { innerWorkflow } from "./error-inner";

const errorWorkflow = createWorkflow({
  id: "error-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(innerWorkflow);

errorWorkflow.commit();

export { errorWorkflow };
