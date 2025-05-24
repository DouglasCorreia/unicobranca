const mix = require("laravel-mix");
const ESLintPlugin = require('eslint-webpack-plugin'); // Importa o plugin ESLint

// ===================
// Configurações
// ===================
//Raiz dos resources
const resourcesPath = "./resources/";
//Raiz dos assets
const themePath = "./assets/";

//Local onde estão os JS
//Local onde irão os JS Compilados
const jsOutput = themePath + "js";
//Local onde irão os css compilados
const sassOutput = themePath + "css";

const isProduction = mix.inProduction();

console.log("Is in production mode: " + isProduction);

// ===================
// Você não precisa mexer em mais nada a partir daqui
// ===================

let criticals = [
	"app.scss",
	"app-critical.scss",
	"app-home.scss",
	"app-home-critical.scss",
];

let jsFiles = [
	"app-functions.js"
];

let sassFiles = [...criticals];
const sassSettings = {};
// ===================
// Configuração do Webpack
// ===================
mix.webpackConfig({
	plugins: [
		new ESLintPlugin({
			extensions: ['js'], // Verifica arquivos .js
			exclude: ['node_modules'], // Exclui a pasta node_modules
			fix: true, // Tenta corrigir problemas automaticamente
			files: [`${resourcesPath}JS/**/*.js`], // Adiciona o caminho para os arquivos JS
		}),
	]
});
mix.setPublicPath(themePath);
mix.options({
	processCssUrls: false,
	terser: {
        extractComments: false,
    }
});

jsFiles.forEach((filename) => {
	mix.js(resourcesPath + "js/" + filename, jsOutput).version();
});

sassFiles.forEach((filename) => {
	mix.sass(resourcesPath + "scss/" + filename, sassOutput, sassSettings).version();
});

mix.disableNotifications();
