/**
 * This doesn't fail, because the import in `ok-inner.ts` is from `@mastra/core`, not `@mastra/core/workflows`
 */

import { createWorkflow } from "@mastra/core";
import z from "zod";
import { innerWorkflow } from "./ok-inner";

const okWorkflow = createWorkflow({
  id: "error-workflow",
  inputSchema: z.any(),
  outputSchema: z.any(),
})
  .then(innerWorkflow);

  okWorkflow.commit();

export { okWorkflow };
