const Project = require('../modals/Project');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const { buildProjectQuery } = require('../utils/buildQuery');

const createProject = async (req, res) => {

      req.body.user = req.user.userId;
  
      if (!req.files || !req.files.image) {
          throw new CustomError.BadRequestError('No Image uploaded');
      }
  
      const projectImage = req.files.image;
  
      if (!projectImage.mimetype.startsWith('image')) {
          throw new CustomError.BadRequestError('Please Upload Image');
      }
  
      const maxSize = 1024 * 1024;
  
      if (projectImage.size > maxSize) {
          throw new CustomError.BadRequestError('Please upload an image smaller than 1MB');
      }
  
      const imagePath = path.join(
          __dirname,
          '../public/uploads/' + `${projectImage.name}`
      );
  
      await projectImage.mv(imagePath);
  
      const project = await Project.create({
            ...req.body, 
            image: `/uploads/${projectImage.name}`,
      });
      res.status(StatusCodes.CREATED).json({ project });
};

const getAllProjects = async (req, res) => {
 const { queryObject, sortOption } = buildProjectQuery(req.query);

  let result = Project.find(queryObject);

  switch (sortOption) {
    case 'a-z':
      result = result.sort('name');
      break;
    case 'z-a':
      result = result.sort('-name');
      break;
    case 'latest':
      result = result.sort('-createdAt');
      break;
    case 'oldest':
      result = result.sort('createdAt');
      break;
    default:
  }

      // const page = Number(req.query.page) || 1;
      // const limit = Number(req.query.limit) || 10;
      // const skip = (page - 1) * limit;

      // result = result.skip(skip).limit(limit);

      const projects = await result;

      // const totalProjects = await Project.countDocuments(req.query);
      // const numOfPages = Math.ceil(totalProjects / limit);

      res.status(StatusCodes.OK).json({ projects, count: projects.length })
}

const getSingleProject =  async (req, res) => {
      const { id: projectId} = req.params;

      const project = await Project.findOne({ _id: projectId})

      if (!project) {
            throw new CustomError.NotFoundError(`No project with id: ${projectId}`);
      }

      res.status(StatusCodes.OK).json({ project });
}

const updateProject = async (req, res) => {
      const {
            body: { user, isArchived },
            params: { id: projectId } 
      } = req;

      const projectImage = req.files.image;

      if (!projectImage.mimetype.startsWith('image')) {
            throw new CustomError.BadRequestError('Please Upload Image');
      }

      const maxSize = 1024 * 1024;

      if (projectImage.size > maxSize) {
            throw new CustomError.BadRequestError(
            'Please upload image smaller than 1MB'
            ) ;
      }

      const imagePath = path.join(
            __dirname,
            '../public/uploads' + `${projectImage.name}`
      );

      await projectImage.mv(imagePath);

      // const existingProject = await Project.findById(projectId);

      // console.log(existingProject.image)
      
      const project = await Project.findOneAndUpdate({ _id: projectId}, {
            ...req.body,
            image: `/uploads/${projectImage.name}` || ''
      }, {
            new: true,
            runValidators: true,
      });

      if (!project) {
            throw new CustomError.NotFoundError(`No project with id : ${projectId}`);
      }

      res.status(StatusCodes.OK).json({ project });
}

const getAllArchived = async (req, res) => {
      const { queryObject, sortOption } = buildProjectQuery(req.query);

      let result = Project.find({...queryObject, isArchived: true });

      switch (sortOption) {
      case 'a-z':
            result = result.sort('name');
            break;
      case 'z-a':
            result = result.sort('-name');
            break;
      case 'latest':
            result = result.sort('-updatedAt');
            break;
      case 'oldest':
            result = result.sort('updatedAt');
            break;
      default:
      }

      const projects = await result;

      res.status(StatusCodes.OK).json({ projects, count: projects.length });
}

const getAllCompleted = async (req, res) => {
      
      const { queryObject, sortOption } = buildProjectQuery(req.query);

      let result = Project.find({...queryObject, isCompleted: true });

      switch (sortOption) {
      case 'a-z':
            result = result.sort('name');
            break;
      case 'z-a':
            result = result.sort('-name');
            break;
      case 'latest':
            result = result.sort('-updatedAt');
            break;
      case 'oldest':
            result = result.sort('updatedAt');
            break;
      default:
      }

      const projects = await result;

      res.status(StatusCodes.OK).json({ projects, count: projects.length });
}

module.exports = {
      createProject,
      getAllProjects,
      getSingleProject,
      updateProject,
      getAllArchived,
      getAllCompleted
}

// githubRepoLink