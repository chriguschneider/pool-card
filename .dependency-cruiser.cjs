// dependency-cruiser — enforces module boundaries. Run via `npm run depcheck`.
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies make load order fragile and break tree-shaking.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      severity: 'warn',
      comment: 'Orphan modules are usually dead code left behind after a refactor.',
      from: { orphan: true, pathNot: ['\\.d\\.ts$'] },
      to: {},
    },
    {
      name: 'no-test-in-src',
      severity: 'error',
      comment: 'Production modules must not import test helpers.',
      from: { path: '^src/' },
      to: { path: '(\\.test\\.|/test/)' },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: { exportsFields: ['exports'], conditionNames: ['import', 'require'] },
  },
};
