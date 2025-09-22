import logger from "../config/logger.js";

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

const errorHandler = (error, req, res, next) => {
  logger.error('Error', error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(422).json({ error: error.message });
  }

  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };