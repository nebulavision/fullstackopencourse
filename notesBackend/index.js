import app from './app.js';
import { PORT } from './config/config.js';
import logger  from './config/logger.js';

app.listen(PORT, () => logger.info(`Server runing on port ${PORT}`));