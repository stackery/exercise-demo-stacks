const path = require('path');
const promisify = require('promisify-node');
const fs = promisify('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const buckets = JSON.parse(process.env.buckets);

exports.handler = async message => {
  const taskRoot = process.env.LAMBDA_TASK_ROOT;
  const content = await fs.readFile(path.join(taskRoot, "portland.jpg"));
  console.log('Did read content; length ', content.length);

  for (const bucket of buckets) {
    console.log('Putting to ', bucket);
    const result = await s3.putObject({
      Body: content,
      Key: 'portland.jpg',
      Bucket: bucket
    }).promise();
    console.log('Put gave: ', result);
  }
  return {};
};
