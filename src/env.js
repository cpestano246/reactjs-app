import envConfig from './env-config.json';

export let env;
if (process.env.NODE_ENV === 'development') {
    env = envConfig.dev;
} else if(process.env.NODE_ENV === 'production') {
    env = envConfig.prod;
}
