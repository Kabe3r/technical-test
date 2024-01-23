const Project = require("../modals/Project");

const buildProjectQuery = (options) => {
      const { search, sort, page = 1, limit = 10 } = options;
    
      const queryObject = {};
    
      if (search !== 'undefined' && search) {
        queryObject.name = { $regex: search, $options: 'i' };
      }
    
      // const skip = (page - 1) * limit;
    
      return {
        queryObject,
        sortOption: sort,
      //   skip,
        limit,
      };
    };

module.exports = { buildProjectQuery };    