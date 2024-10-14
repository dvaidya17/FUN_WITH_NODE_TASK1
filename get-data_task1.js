const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const params = {
    Bucket: 'funwithnodetask1',  
  };

  try {
    
    const data = await s3.listObjectsV2(params).promise();
    
    const files = data.Contents.map(file => file.Key);

    
    const fileContents = await Promise.all(
      files.map(async (fileKey) => {
        const fileParams = {
          Bucket: 'funwithnodetask1',
          Key: fileKey,
        };
        const fileData = await s3.getObject(fileParams).promise();
        return JSON.parse(fileData.Body.toString('utf-8'));
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(fileContents),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching data from S3',
        error: err.message,
      }),
    };
  }
};
