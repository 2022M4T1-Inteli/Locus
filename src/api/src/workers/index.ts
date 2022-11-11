import Bull from 'bull';

export default class Worker {
	private queue: Bull.Queue;

	constructor(name: string, options?: Bull.QueueOptions) {
		this.queue = new Bull(name, {
			redis: process.env.REDIS_URL || 'redis://localhost:6379',
			...options,
		});
	}

	public async setProcessor(
		name: string,
		processor: Bull.ProcessCallbackFunction<any>,
	): Promise<void> {
		await this.queue.process(name, processor);
	}

	public async addJob(name: string, data: any): Promise<Bull.Job> {
		return await this.queue.add(name, data);
	}

	public async close(force = false): Promise<void> {
		await this.queue.close(force);
	}

	public async count(): Promise<number> {
		return this.queue.count();
	}

	public async getJobs(Job_status: Bull.JobStatus[]): Promise<Bull.Job[]> {
		return this.queue.getJobs(Job_status);
	}

	public async getJob(id: Bull.JobId): Promise<Bull.Job | null> {
		return this.queue.getJob(id);
	}
}
