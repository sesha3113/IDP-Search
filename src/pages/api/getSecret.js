var AWS = require("aws-sdk");
const handler = async (req, res) => {
  AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIAZ4UOCB723QR5GW7E",
    secretAccessKey: "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",
  });

  const ssm = new AWS.SSM();
  const parameter = await ssm
    .getParameter({
      Name: "apiKey",
      WithDecryption: true,
    })
    .promise();

  const response = { token: `${parameter.Parameter.Value}` };
  return res.status(200).send(response);
};

export default handler;
