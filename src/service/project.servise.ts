import { Types } from 'mongoose';
import { IProject, ProjectModel } from '../models/project.model.js';

export type CreateProjectData = Pick<
	IProject,
	'title' | 'description' | 'status' | 'organization'
>;

export type UpdateProjectData = Partial<CreateProjectData>;

export const create = async (data: CreateProjectData) =>
	ProjectModel.create(data);

export const getById = async (id: Types.ObjectId | string) =>
	ProjectModel.findById(id).populate('organization').exec();

export const update = async (id: Types.ObjectId | string, data: UpdateProjectData) =>
	ProjectModel.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true
	}).exec();

export const deleteProject = async (id: Types.ObjectId | string) =>
	ProjectModel.findByIdAndDelete(id).exec();

export const listAll = async () =>
	ProjectModel.find().lean().exec();
