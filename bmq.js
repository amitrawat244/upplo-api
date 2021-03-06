import { Queue, Worker } from 'bullmq';

import IORedis from 'ioredis';

const connection = new IORedis();

const myQueue = new Queue('myqueue', { connection });
const myWorker = new Worker('myqueue', async (job) => {
    const { fileId } = job.data;
    console.log(`TODO Call upplo-cms API to process file ${fileId}`);
    console.log(`TODO file processed ${fileId}`);
}, { connection });
myQueue.pause();

myWorker.on('completed', (job) => {
    const { fileId } = job.data;
    console.log(`Job-id:${job.id} has completed! (fileId: ${fileId})`);
});

myWorker.on('failed', (job, err) => {
    const { fileId } = job.data;
    console.log(`${job.id} (fileId: ${fileId}) has failed with ${err.message}`);
});

export const fileQueue = async (data) => {
    return new Promise(async (resolve, reject) => {
        const waitingJobs = await myQueue.getWaiting();
        if (waitingJobs.find(job => job.data.fileId === data.fileId)) {
            resolve('Job already added');
            return;
        }
        await myQueue.add('myqueue', data);
        resolve('Job added');
    })

}

let timeout;
export const processQueue = async () => {
    console.log('---Processing Queue---');
    const waitingJobs = await myQueue.getWaiting();
    if (!waitingJobs.length) {
        console.log('---Queue is Empty---');
        return;
    }
    myQueue.resume();
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        myQueue.pause();
    }, 5000)
}