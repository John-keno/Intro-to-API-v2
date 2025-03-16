import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const reqLogger = (req: Request, res: Response, next: NextFunction) => {
	const reqStartTime = Date.now();

	res.on("finish", () => {
		const reqDuration = Date.now() - reqStartTime;
		const logLevel =
			res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
		logger.log(
			logLevel,
			`METHOD: ${req.method} | URL: ${req.url} | STATUS: ${res.statusCode} | DURATION: ${reqDuration}ms | IP: ${req.ip} | USER-AGENT: ${req.headers["user-agent"]}`
		);
	});
	next();
};
