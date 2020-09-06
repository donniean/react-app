const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const devMode = env === 'development';
const prodMode = env === 'production';

module.exports = { env, devMode, prodMode };
