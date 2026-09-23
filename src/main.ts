import { connectDatabase, disconnectDatabase } from './config/db.js';
import { OrganizationModel } from './models/organization.model.js';
import { ProjectModel } from './models/project.model.js';
import {
  create,
  deleteProject,
  getById,
  listAll,
  update
} from './service/project.servise.js';

const main = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('Conectado a MongoDB');

    await ProjectModel.deleteMany({});
    await OrganizationModel.deleteMany({});

    const organization = await OrganizationModel.create({
      name: 'Initech',
      country: 'USA'
    });

    const project = await create({
      title: 'Nueva aplicación web',
      description: 'Aplicación para gestionar usuarios',
      status: 'PLANNED',
      organization: organization._id
    });
    console.log('CREATE:', project);

    const projectWithOrganization = await getById(project._id);
    console.log('GET BY ID con populate:', projectWithOrganization);

    const updatedProject = await update(project._id, {
      status: 'ACTIVE'
    });
    console.log('UPDATE:', updatedProject);

    const projects = await listAll();
    console.log('LIST ALL con lean:', projects);

    const deletedProject = await deleteProject(project._id);
    console.log('DELETE:', deletedProject);
  } catch (error) {
    console.error('Error en main:', error);
  } finally {
    await disconnectDatabase();
    console.log('Desconectado de MongoDB');
  }
};

main();
