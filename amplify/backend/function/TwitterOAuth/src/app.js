const https = require('https');
const TwitterAPI = require('twitter-api-v2').default;
const twitterClient = new TwitterAPI({
    clientId: 'VTB1Rm9jejRiZ0xSeW1oc2NXeVM6MTpjaQ',
    clientSecret: 'VCLsdldvo8kZyjTPSSqyutV6o6IuxpVqNjIaHps8q-aaub8Nsd',
});

const callbackURL = 'http://127.0.0.1:3000/'
/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event) => {
  try {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callbackURL, {
      scope: ['tweet.read', 'tweet.write', 'users.read']
    });

    console.log(codeVerifier);
    console.log(state);
    console.log(url);

    const response = {
      statusCode: 302, // Redirect status code
      headers: {
        Location: url,
      },
      body: '',
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
