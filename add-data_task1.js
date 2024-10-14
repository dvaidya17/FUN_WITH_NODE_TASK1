const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {

  const body = JSON.parse(event.body);

  
  const params = {
    Bucket: 'funwithnodetask1',  
    Key: `${Date.now()}.json`,   
    Body: JSON.stringify(body),  
    ContentType: 'application/json',
    ACL: 'public-read',          
  };

  try {
  
    const data = await s3.putObject(params).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data successfully uploaded',
        key: params.Key,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error uploading data to S3',
        error: err.message,
      }),
    };
  }
};
