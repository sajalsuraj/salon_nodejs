import app from './app.js';
import logger from './utils/logger.js';

app.listen(3001, () => logger.info("Salon Service started!!"));
