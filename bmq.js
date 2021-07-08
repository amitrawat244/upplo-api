import { Queue, Worker } from 'bullmq';


const JOB_NAME = "FILE_JOB_t";
const queueFile = new Queue(JOB_NAME);

export const fileQueue = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log('0');
        const waitingJobs = await queueFile.getWaiting();
        console.log('1');
        if (waitingJobs.find(job => job.fileId === data.fileId)) {
            resolve('Job already added');
        }
        console.log('2');
        await queueFile.add(JOB_NAME, data);
        console.log('3');
        resolve('Job added');
    })

}


export const processQueue = async () => {
    console.log('---Processing Queue---')
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