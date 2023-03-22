import { Request, Response } from 'express';
import { requestStorage } from 'common/async-storages/request.storage';

/**
 * Attach request object to current code execution
 */
export function attachRequestMiddleware(req: Request, res: Response, next: Function) {
  requestStorage.run(req, () => {
    next();
  });
}
