import boom from 'boom';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
import Car from '../models/Car';

export class CarsController {
	private myCar: any;
	constructor(myCar: any) {
		this.myCar = myCar;
	}
	async getCars(req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document[]> {
		try {
			const cars = await Car.find();
			return cars;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async getSingleCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document | null> {
		try {
			const id = req.params.id;
			const car = await Car.findById(id);
			return car;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async addCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>) {
		try {
			const car = await Car.create(req.body);
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
			const update = await Car.findByIdAndUpdate(id, updateData, { new: true });
			return update;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
	async deleteCar(req: FastifyRequest, reply: FastifyReply<ServerResponse>) {
		try {
			const id = req.params.id;
			const car = await Car.findByIdAndRemove(id);
			return car;
		} catch (err) {
			throw boom.boomify(err);
		}
	}
}
