module.exports = wallaby => {
  var compilerOptions = Object.assign(
    require('./tsconfig.json').compilerOptions,
    require('./lib/tsconfig.spec.json').compilerOptions
  );

  return {
    files: [
      'lib/tsconfig.spec.json',
      'lib/tsconfig.es5.json',
      'lib/jest.ts',
      'lib/jest-global-mocks.ts',
      'lib/src/*.ts',
      '!lib/src/*.spec.ts'
    ],

    tests: ['lib/src/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    testFramework: 'jest',
    setup: function() {
      const jestConfig = require('./package.json').jest;
      wallaby.testFramework.configure(jestConfig);
    },
    debug: true
  };
};
