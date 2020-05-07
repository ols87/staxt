import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const { parsed: env } = result;

console.log(env);

export default env;
