import { HttpException } from '@/exceptions/HttpException';
import { Response, NextFunction, Request } from 'express';

function validateWalletAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const regex = /(0x[a-f0-9]{40})/g;
  const address = req.params.walletAddress;

  if (!address.match(regex)) {
    next(new HttpException(400, 'Invalid wallet address'));
  } else {
    next();
  }
}

export { validateWalletAddress };
