
declare global: {
  // MODELS
  var models: { Users: 'typeof import("./src/modules/users/user.schema")' };

  // MiDDLEWARES
  var middlewares: {
  id_validation: 'typeof import("./src/middlewares/id_validation.middleware")',
  jwt: 'typeof import("./src/middlewares/jwt.middleware")',
  local_passport: 'typeof import("./src/middlewares/local_passport.middleware")',
  query_validation: 'typeof import("./src/middlewares/query_validation.middleware")',
  validation: 'typeof import("./src/middlewares/validation.middleware")'
};

  //SERVICES
  var services: {
  AuthService: 'typeof import("./src/services/auth.service").AuthService',
  CrudService: 'typeof import("./src/services/crud.service").CrudService'
};

  // UTILS
  var utils: {
  globalFile: 'typeof import("./src/utils/globalFile.util")',
  hash: 'typeof import("./src/utils/hash.util")',
  random: 'typeof import("./src/utils/random.util")'
};

  // LIBS
  var libs: { email_service: 'typeof import("./src/libs/email_service.lib")' };

  // ACTIONS
  var actions: {
  users: {
    auth: 'typeof import("./src/modules/users/actions/user.auth.action").auth'
  }
};

  // VALIDATORS
  var validators: { users: 'typeof import("./src/modules/users/user.validator")' };

  var messages: typeof import("./config/messages");
  var dataConstraint: typeof import("./config/data_constraints");

  namespace Express {
    interface Request {
      roleModel: Model<Document>;
    }
  }

}

export {};

