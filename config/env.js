const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const isDevelopmentEnv = env === 'development';
const isProductionEnv = env === 'production';

module.exports = { env, isDevelopmentEnv, isProductionEnv };
