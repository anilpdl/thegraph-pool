import { Router } from 'express';

import IndexController from '@/controllers/index.controller';
import { validateWalletAddress } from '@/middlewares/validator.middleware';

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
    this.router.get(
      `${this.path}collateral/:walletAddress/total`,
      validateWalletAddress,
      this.indexController.fetchUserTotalCollateral
    );
    this.router.get(
      `${this.path}collateral/:walletAddress`,
      validateWalletAddress,
      this.indexController.fetchUserCollateral
    );
    this.router.get(
      `${this.path}borrow/total`,
      this.indexController.fetchTotalBorrow
    );
    this.router.get(
      `${this.path}borrow/:walletAddress`,
      validateWalletAddress,
      this.indexController.fetchUserBorrows
    );
    this.router.get(
      `${this.path}borrow/:walletAddress/total`,
      validateWalletAddress,
      this.indexController.fetchUserTotalBorrow
    );
    this.router.get(`${this.path}trend`, this.indexController.fetchSystemTrend);
    this.router.get(
      `${this.path}trend/:walletAddress`,
      validateWalletAddress,
      this.indexController.fetchUserTrend
    );
  }
}

export default IndexRoute;
