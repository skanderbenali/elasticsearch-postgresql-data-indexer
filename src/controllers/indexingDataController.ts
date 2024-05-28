import { Request, Response } from 'express';
import {indexingData} from '../services/dataIndexer';
import {logger} from "../utils/logger";
/**
 * sample controller
 * @param { Request } req
 * @param { Response } res
 * @returns { Promise<void> }
 */
export const indexingPgData = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await indexingData();
    res.status(200).json(result);
  } catch (error:any) {
    logger.error(`Error: ${error.message}`);

    const statusCode = error.message === 'Something Went Wrong' ? 404 : 500;
    res.status(statusCode).json({
      message: error.message,
      statusCode,
    });
  }
};
