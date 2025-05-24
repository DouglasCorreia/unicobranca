module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"globals": {
		client: "readonly",
		setInnerHtml: "readonly",
		buyTogetherSetup: "readonly",
		YT: "readonly",
	},
	"extends": [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"prettier"
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"eqeqeq": "error",
		"no-console": ["warn", { allow: ["warn", "error","info"] }],
		"no-var": "error",
		"prefer-const": "error",
		"no-unused-vars": ["error", {
			"caughtErrorsIgnorePattern": "^ignore",
			"varsIgnorePattern": "^_",
			"argsIgnorePattern": "^_" }
		],
		"semi": ["error", "always"],
		"quotes": ["error", "single"],
		"curly": "error",
		"indent": ["error", "tab"],
		"prettier/prettier": ["error", { "useTabs": true, "singleQuote": true, "semi": true }],
		"no-undef": ["warn"]
	},
	"plugins": ["prettier"]
};
