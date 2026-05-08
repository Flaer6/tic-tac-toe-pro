import { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
	schema: `${process.env.VITE_API_URL}/graphql`,
	documents: './src/graphql/**/*.graphql',
	generates: {
		'./src/graphql/generated/output.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
		},
	},
	ignoreNoDocuments: true,
	config: {
		withHooks: true,
		reactApolloVersion: 3,
		apolloReactHooksImportFrom: '@apollo/client/react',
	},
}
export default config
