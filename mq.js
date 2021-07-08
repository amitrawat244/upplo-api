import { Queue, Worker } from 'bullmq';


const QUEUE_NAME = "FILE_QUEUE";
const JOB_NAME = "FILE_JOB";
const queueFile = new Queue(QUEUE_NAME);

export const fileQueue = async (data) => {
    console.log(data);
    const waitingJobs = await queueFile.getWaiting();
    if (waitingJobs.find(job => job.fileId === data.fileId)) {
        return 'Job already added';
    }
    await queueFile.add(JOB_NAME, data);
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