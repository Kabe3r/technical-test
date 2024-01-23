const { StatusCodes } = require("http-status-codes");
const Project = require("../modals/Project");

const getAllArchived = async (req, res) => {
      const archivedProjects = await Project.find({});

      res.status(StatusCodes.OK).json({ archivedProjects });
}

module.exports =  { getAllArchived };