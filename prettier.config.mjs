/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'cva', 'twMerge'],
};
