import 'dotenv/config'

module.exports = {
	service: {
		endpoint: {
			url: process.env.VITE_API_URL + '/graphql',
			skipSSLValidation: true,
		},
	},
}
