import { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
	schema: `${process.env.VITE_API_URL}/graphql`,
	documents: './src/graphql/**/*.graphql',
	generates: {
		'./src/graphql/generated/output.ts': {
			plugins: ['typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
				reactApolloVersion: 3,
				apolloReactHooksImportFrom: '@apollo/client/react',
				scalars: {
					DateTime: 'string',
				},
				skipTypename: true,
			},
		},
	},
	ignoreNoDocuments: true,
	config: {
		withHooks: true,
		reactApolloVersion: 3,
		apolloReactHooksImportFrom: '@apollo/client/react',
		scalars: {
			DateTime: 'string',
		},
	},
}
export default config
