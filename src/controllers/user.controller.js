// *************** IMPORT MODULES ***************
import UserModel from '../graphql/users/user.model.js';

/**
 * The function RequestAuthGoogleController redirects to Google's OAuth2 authentication URL using
 * environment variables for client ID and callback URI.
 * @param _ - The underscore (_) in the function parameters typically represents a placeholder for an
 * unused parameter. In this case, it seems that the function does not require any input parameters, so
 * the underscore (_) is used to indicate that the parameter is not being used within the function
 * body.
 * @param res - The `res` parameter in the `RequestAuthGoogleController` function is the response
 * object that is used to send a response back to the client making the request. In this case, the
 * `res` object is being used to redirect the client to the Google authentication URL generated in the
 * `authURL
 */
const RequestAuthGoogleController = async (_, res) => {
  try {
    const authURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URI}&response_type=code&scope=openid%20profile%20email`;
    res.redirect(authURL);
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
};

/**
 * The function `HandleAuthGoogleController` handles the authentication process with Google OAuth2,
 * including obtaining access token and user information.
 * @param req - The `req` parameter in the `HandleAuthGoogleController` function typically represents
 * the HTTP request object, which contains information about the incoming request such as headers,
 * parameters, and query strings. In this case, you are accessing the query parameters using
 * `req.query` to retrieve the authorization code.
 * @param res - The `res` parameter in the `HandleAuthGoogleController` function represents the
 * response object in Express.js. It is used to send a response back to the client making the request.
 * In the provided code snippet, `res` is used to send different status codes and messages based on the
 * outcome of
 * @returns The code is returning the `user` object if all the necessary conditions are met. If any of
 * the conditions fail (such as missing authorization code, failed to obtain access token, failed to
 * obtain user info from Google, or email not registered), it will return an appropriate error message
 * with the corresponding status code.
 */
const HandleAuthGoogleController = async (req, res) => {
  try {
    // *************** Get code from request
    const { code } = req.query;
    if (!code) {
      return res.status(404).send('Authorization code not found');
    }

    // *************** Request to get access token from google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.CALLBACK_URI,
        grant_type: 'authorization_code',
        code,
      }),
    });

    // *************** Get access_token from response
    const { access_token } = await tokenResponse.json();
    if (!access_token) {
      return res.status(404).send('Failed to obtain access token');
    }

    // *************** Request to get user info from google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // *************** Get user info from response
    const userInfo = await userInfoResponse.json();
    if (!userInfo) {
      return res.status(404).send('Failed to obtain user info from google');
    }

    // *************** Find user in platform based email from google
    const user = await UserModel.findOne({ email: userInfo.email, status: 'active' }).lean();
    if (!user) {
      return res.status(404).send('Email is not registered');
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error.stack);
    throw new Error(error.message);
  }
};

const UserController = {
  RequestAuthGoogleController,
  HandleAuthGoogleController,
};

// *************** EXPORT CONTROLLERS ***************
export default UserController;
