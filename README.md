This repository contains a reproducible example of [Mastra issue #6416](https://github.com/mastra-ai/mastra/issues/6416).

I've attempted to remove as much as possible while still being able to reproduce the error locally.

This error can only be reproduced by us by building and starting the server, or by serving a built version. Running the dev server (i.e. replace step 1. with `npm run dev`) will not replicate this error, the workflow will instead complete successfully.

# Steps to reproduce

1. Build & run:
    `npm run build && npm run start`
2. Then in another process run the following script to reproduce the error:
    `npm run reproduce-bug`
3. See the  error logged by the script watching the workflow.

# Description of bug

We're seeing a failure in our built `mastra` server only that reads `Cannot read properties of undefined (reading 'result')`. The workflows work during development through the dev server.

This only happens with a workflow that uses `then` (or `foreach`) to call another workflow, and that other workflow is in another file.

File #1:
```javascript
const error = createWorkflow({ ... })
  .then(innerWorkflow);
```

File #2 (must be in another file):
```javascript
const innerWorkflow = createWorkflow({ ... })
  .then(
    createStep({
      ...
    })
  )
```

The `innerWorkflow` must be located in a separate file. If it is moved into the same file as `errorWorkflow` the error no longer occurs.

# Other findings

We've also included some comparison workflows that don't reproduce the bug, included in `src/mastra/workflows/ok-flows`.

These can be ran with `npm run workflow {workflowId}`. (note: `workflowId` must be the camelcase name, not what is in `createWorkflow`'s `id` property)

From these, it seems the following are required for this bug to occur:
1. You must have a nested workflow structure (i.e. one workflow calling another workflow.)
2. The inner workflow that is called by the outer workflow must be defined a separate file and imported.
3. Mastra must be ran in a built state (i.e. not as a dev server, but with build+start steps).

# Example error output
From workflow watch:
```javascript
{
  type: 'watch',
  payload: {
    workflowState: {
      status: 'failed',
      steps: [Object],
      result: null,
      error: "Error: Cannot read properties of undefined (reading 'result')\n" +
        '    at DefaultExecutionEngine.executeStep (<redacted>/.mastra/output/mastra.mjs:25869:54)\n' +
        '    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n' +
        '    at async DefaultExecutionEngine.executeEntry (<redacted>/.mastra/output/mastra.mjs:26455:21)\n' +
        '    at async DefaultExecutionEngine.execute (<redacted>/.mastra/output/mastra.mjs:25470:22)\n' +
        '    at async Run.start (<redacted>/.mastra/output/mastra.mjs:27797:20)'
    }
  },
  eventTimestamp: 0, //redacted
  runId: '6795bc70-06fc-44ce-9660-3a205f227d34'
}
```

Also note the logs from the mastra server which include some additional info, including that this appears to have a prior exception logged before the one that is returned to the client:
```
Error executing step: Error: Cannot read properties of undefined (reading 'emit')
    at DefaultExecutionEngine.execute (<redacted>/.mastra/output/mastra.mjs:28334:54)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Run.start (<redacted>/.mastra/output/mastra.mjs:30616:20)
    at async Workflow.execute (<redacted>/.mastra/output/mastra.mjs:30479:10)
    at async DefaultExecutionEngine.executeStep (<redacted>/.mastra/output/mastra.mjs:25810:24)
    at async DefaultExecutionEngine.executeEntry (<redacted>/.mastra/output/mastra.mjs:26455:21)
    at async DefaultExecutionEngine.execute (<redacted>/.mastra/output/mastra.mjs:25470:22)
    at async Run.start (<redacted>/.mastra/output/mastra.mjs:27797:20)
Error executing step debug-test-inner-workflow: Error: Cannot read properties of undefined (reading 'result')
    at DefaultExecutionEngine.executeStep (<redacted>/.mastra/output/mastra.mjs:25869:54)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async DefaultExecutionEngine.executeEntry (<redacted>/.mastra/output/mastra.mjs:26455:21)
    at async DefaultExecutionEngine.execute (<redacted>/.mastra/output/mastra.mjs:25470:22)
    at async Run.start (<redacted>/.mastra/output/mastra.mjs:27797:20)
```
