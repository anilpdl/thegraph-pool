import { Router } from 'express';

import IndexController from '@/controllers/index.controller';

class IndexRoute {
  private path = '/';
  private userPath = '/user';
  private router = Router();
  private indexController = new IndexController();

  constructor() {
    this.initialize();
  }

  initialize() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}list`, this.indexController.fetchSystemData);
    this.router.get(
      `${this.userPath}/:walletAddress`,
      this.indexController.fetchUserData
    );
  }
}

export default IndexRoute;
