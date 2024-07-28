// tailwind.config.js
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			colors: {
				"purple-900": "#4B0082",
			},
			backgroundImage: {
				"gradient-to-b":
					"linear-gradient(to bottom, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
