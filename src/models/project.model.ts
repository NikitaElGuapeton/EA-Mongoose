import { Schema, model, Types } from 'mongoose';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'DONE';

export interface IProject {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: ProjectStatus;
  organization: Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['PLANNED', 'ACTIVE', 'DONE'],
    required: true,
    default: 'PLANNED'
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  }
});

export const ProjectModel = model<IProject>('Project', projectSchema);
