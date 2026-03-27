const { withNativeFederation, share, DEFAULT_SKIP_LIST, shareAll } = require('@angular-architects/native-federation/config');
const { isInSkipList, prepareSkipList } = require('@softarc/native-federation/src/lib/core/default-skip-list')
const { peerDependencies: coreShellDeps } = require('@core/platform-manifest/package.json');

const preparedSkipList = prepareSkipList(DEFAULT_SKIP_LIST)

const sharedDeps = Object.fromEntries(
  Object.entries(coreShellDeps).filter(([depName])=>!isInSkipList(depName,preparedSkipList)).map(([depName, depVersion]) => [
    depName, 
    { 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: depVersion 
    }
  ])
);

module.exports = withNativeFederation({
  name: 'remote-app',



  exposes: {
    './Component': './apps/remote-app/src/app/app.ts',
  },

  shared: {
    ...share(sharedDeps)
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
});
