import { MastraClient } from '@mastra/client-js';

export const mastraClient = new MastraClient({
  baseUrl: 'http://localhost:4111/',
});

const workflowId = process.argv[2] || "errorWorkflow";
const inputData = process.argv[3] ? JSON.parse(process.argv[3]) : undefined;
console.log({workflowId, inputData})

const workflow = mastraClient.getWorkflow(workflowId);
const run = await workflow.createRun();

console.log(run);

workflow
  .watch(run, (record) => {
    console.log(record);
  })
  .catch((e) => {
    console.log('workflow watch error');
    console.error(e);
  });

console.log(await workflow.start({ runId: run.runId, inputData: {} }));
