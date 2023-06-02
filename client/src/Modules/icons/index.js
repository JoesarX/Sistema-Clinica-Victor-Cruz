const importAll = (requireContext) => requireContext.keys().map(requireContext);
const svgFiles = importAll(require.context('.', false, /\.svg$/));

export default svgFiles;
