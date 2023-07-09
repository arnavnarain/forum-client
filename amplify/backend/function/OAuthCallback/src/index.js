const TwitterAPI = require('twitter-api-v2').default;
const twitterClient = new TwitterAPI({
    clientId: 'VTB1Rm9jejRiZ0xSeW1oc2NXeVM6MTpjaQ',
    clientSecret: 'VCLsdldvo8kZyjTPSSqyutV6o6IuxpVqNjIaHps8q-aaub8Nsd',
});

const callbackURL = 'http://127.0.0.1:3000/oauth-callback'
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
      const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callbackURL, {
        scope: ['tweet.read', 'tweet.write', 'users.read']
      });
  
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          authLink: url,
          codeVerifier: codeVerifier,
          state: state
        }),
      };
  
      return response;
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred' }),
      };
    }
  };
