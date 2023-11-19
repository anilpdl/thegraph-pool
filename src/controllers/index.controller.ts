import { NextFunction, Request, Response } from 'express';

import GraphService from '@/services/graph.service';
import { calculateSupplyTrend, groupByBlock, sumField } from '@/utils';

class IndexController {
  private graphService = new GraphService();

  public index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.status(200).send('Ok');
  };

  public fetchUserCollateral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;

      const deposit = await this.graphService.fetchUserDeposits(walletAddress);

      res.status(200).send({
        deposit
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchUserTotalCollateral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;

      const collaterals =
        await this.graphService.fetchUserDeposits(walletAddress);
      const total = sumField(collaterals, 'tokenAmount');

      res.status(200).send({
        total
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchCollateral = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const deposit = await this.graphService.fetchAllDeposits();

      res.status(200).send({ deposit });
    } catch (error) {
      next(error);
    }
  };

  public fetchUserBorrows = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;

      const borrows = await this.graphService.fetchUserBorrow(walletAddress);

      res.status(200).send({
        borrows
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchUserTotalBorrow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;

      const borrows = await this.graphService.fetchUserBorrow(walletAddress);
      const total = sumField(borrows, 'tokenAmount');

      res.status(200).send({
        user: walletAddress,
        total
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchTotalBorrow = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const borrows = await this.graphService.fetchAllBorrow();
      const total = sumField(borrows, 'tokenAmount');

      res.status(200).send({
        total
      });
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

      res.status(200).send({
        deposit,
        borrow
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchUserTrend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const walletAddress = req.params.walletAddress;
      const supplyData = await this.graphService.fetchUserSupply(walletAddress);
      const groupedData = calculateSupplyTrend(supplyData);

      res.status(200).send({
        user: walletAddress,
        supplyData: groupedData
      });
    } catch (error) {
      next(error);
    }
  };

  public fetchSystemTrend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const supplyData = await this.graphService.fetchAllSupply();
      const groupedData = calculateSupplyTrend(supplyData);

      res.status(200).send({
        supplyData: groupedData
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
