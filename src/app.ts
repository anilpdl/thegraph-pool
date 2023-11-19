import express from 'express';
import morgan from 'morgan';

import { env } from '@/config/env';
import { errorConverter, errorHandler } from '@/middlewares/error.middleware';
import GraphService from '@/services/graph.service';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: any[]) {
    this.app = express();
    this.env = 'development';
    this.port = env.PORT || 3000;

    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeLogger();
  }

  public listen() {
    new GraphService().fetchAllCollateral();
    this.app.listen(this.port, () => {
      console.info('=================================');
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info('=================================');
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeErrorHandling() {
    this.app.use(errorConverter);
    this.app.use(errorHandler);
  }

  private initializeRoutes(routes: any[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeLogger() {
    this.app.use(morgan('combined'));
  }
}

export default App;
