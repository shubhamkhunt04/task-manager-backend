import { name, version } from '../../package.json';
import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `${name} API documentation`,
    version
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api`
    }
  ]
};

export default swaggerDef;
