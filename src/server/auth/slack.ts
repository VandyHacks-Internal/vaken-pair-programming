import { Strategy } from 'passport-slack';
import { verifyCallback } from './helpers';
import { Models } from '../models';

const { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_CALLBACK_URL } = process.env;

if (!SLACK_CLIENT_ID) {
	throw new Error('SLACK_CLIENT_ID not set');
}
if (!SLACK_CLIENT_SECRET) {
	throw new Error('SLACK_CLIENT_SECRET not set');
}
if (!SLACK_CALLBACK_URL) {
	throw new Error('SLACK_CALLBACK_URL not set');
}

export const strategy = (models: Models): Strategy =>
	new Strategy(
		{
			clientID: SLACK_CLIENT_ID,
			clientSecret: SLACK_CLIENT_SECRET,
			skipUserProfile: false, // default
			scope: ['identity.basic', 'identity.email'], // default
		},
		(accessToken, refreshToken, profile, done) => {
			profile['emails'] = [{ value: profile['user']['email'] }];
			void verifyCallback(models, profile, done);
		}
	);

export default {
	strategy,
};
