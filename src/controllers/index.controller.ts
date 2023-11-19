import { NextFunction, Request, Response } from 'express';

import GraphService from '@/services/graph.service';

class IndexController {
  private graphService = new GraphService();

  public index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.status(200).send('Ok');
  };

  public fetchSystemData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const borrow = await this.graphService.fetchAllBorrow();
      const deposit = await this.graphService.fetchAllDeposits();
      const collateral = await this.graphService.fetchAllCollateral();
      const withdraws = await this.graphService.fetchAllWithdraws();

      res.status(200).send({ borrow, deposit, collateral, withdraws });
    } catch (error) {
      next(error);
    }
  };

  public fetchUserData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;

      const deposit = await this.graphService.fetchUserDeposits(walletAddress);
      const borrow = await this.graphService.fetchUserBorrow(walletAddress);
      const collateral =
        await this.graphService.fetchUserCollateral(walletAddress);
      const withdraws =
        await this.graphService.fetchUserWithdraws(walletAddress);

      res.status(200).send({
        deposit,
        borrow,
        collateral,
        withdraws
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
