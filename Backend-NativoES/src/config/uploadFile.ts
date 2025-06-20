import AWS from 'aws-sdk';
import { envs } from './envs';

const s3 = new AWS.S3({
  region: envs.AWS_REGION,
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY_ID!,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY!,
  },
});

export default s3;