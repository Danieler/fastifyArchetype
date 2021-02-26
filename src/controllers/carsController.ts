import boom from 'boom';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';

export class CarsController {
	public myCar: any;
	constructor(Car: any) {
		this.myCar = Car;
	}
	async getCars(req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document[]> {
		try {
			const cars = await this.myCar.find();
			return cars;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async getSingleCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document | null> {
		try {
			const id = req.params.id;
			const car = await this.myCar.findById(id);
			return car;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async addCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>) {
		try {
			const car = await this.myCar.create(req.body);
			return car;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async updateCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>) {
		try {
			const id = req.params.id;
			const car = req.body;
			const { ...updateData } = car;
			const update = await this.myCar.findByIdAndUpdate(id, updateData, { new: true });
			return update;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async deleteCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>) {
		try {
			const id = req.params.id;
			const car = await this.myCar.findByIdAndRemove(id);
			return car;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
}
