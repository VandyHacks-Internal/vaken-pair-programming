import { Strategy } from 'passport-slack';
import { verifyCallback } from './helpers';
import { Models } from '../models';

const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_CALLBACK_URL } = process.env;

// if (!GITHUB_CLIENT_ID) {
// 	throw new Error('GITHUB_CLIENT_ID not set');
// }
// if (!GITHUB_CLIENT_SECRET) {
// 	throw new Error('GITHUB_CLIENT_SECRET not set');
// }
// if (!GITHUB_CALLBACK_URL) {
// 	throw new Error('GITHUB_CALLBACK_URL not set');
// }

export const strategy = (models: Models): Strategy =>
	new Strategy(
		{
			callbackURL: SLACK_CALLBACK_URL,
			clientID: SLACK_CLIENT_ID,
			clientSecret: SLACK_CLIENT_SECRET,
			passReqToCallback: false,
			scope: ['identity.basic', 'identity.email'], // fetches non-public emails as well
		},
		(accessToken, refreshToken, profile, verified) => {
			(profile.emails = [
				{
					value: profile.user.email,
				},
			]),
				verifyCallback(models, profile, verified);
		}
	);

export default {
	strategy,
};
