import { Queue, Worker } from 'bullmq';


const JOB_NAME = "PROCESS_FILE";


export const fileQueue = async (data) => {
    const waitingJobs = await myQueue.getWaiting();
    if (waitingJobs.find(job => job.fileId === data.fileId)) {
        return 'Job already added';
    }
    await myQueue.add(JOB_NAME, data);
    return 'Job added';
}


export const processQueue = async () => {
    const worker = new Worker(JOB_NAME, async job => {
        const { fileId } = job.data;
        console.log(`TODO Call upplo-cms API to process file ${fileId}`);
        console.log(`TODO file processed ${fileId}`);
    });
    worker.on('completed', (job) => {
        const { fileId } = job.data;
        console.log(`Job-id:${job.id} has completed! (fileId: ${fileId})`);
    });

    worker.on('failed', (job, err) => {
        const { fileId } = job.data;
        console.log(`${job.id} (fileId: ${fileId}) has failed with ${err.message}`);
    });
}