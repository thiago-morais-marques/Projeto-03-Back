
class ProjectNotFoundException extends Error {
    constructor() {
      super();
      this.message = 'Invalid Owner';
      this.status = 400;
    }
  }
  
  export default ProjectNotFoundException;
