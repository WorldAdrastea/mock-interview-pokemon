module.exports = {
    roots: ["mock-interview-pokemon/src"],
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["js", "jsx"],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
};
  