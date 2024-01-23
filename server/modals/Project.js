const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
      name : {
            type: String,
            trim: true,
            required: [true, 'Please provide project name'],
            maxlength: [100, 'Name can not be more than 100 characters'],
      },
      description: {
            type: String,
            required: [true, 'Please provide project description'],
            maxlength: [1000, 'Description can not be more than 1000 characters']
      },
      startDate: {
            type: Date,
            required: [true, 'Please provide project start date']
      },
      image: {
            type: String,
            default: '/uploads/examples.jpeg'
      },
      labels: {
            type: String,
            required: [true, 'Please provide label of the project'],
            minlength: 4,
      },
      githubRepoLink: {
            type: String,
            required: [true, 'Please provide github repo link of the project'],
            validate: {
                  validator: function (value) {
                        return /^(https:\/\/github\.com\/)([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)$/i.test(value);
                  },
                  message: props => `${props.value} is not a valid GitHub repo link!`
            }
      },
      liveUrl: {
            type: String,
            required: [true, 'Please provide github repo link of the project'],
            validate: {
              validator: function (value) {
                return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,20})(\S*)$/i.test(value);
              },
              message: props => `${props.value} is not a valid URL!`
            }
          },
      isArchived: {
            type: Boolean,
            default: false,
      },
      isCompleted: {
            type: Boolean,
            default: false
      },
      user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
      },
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema);