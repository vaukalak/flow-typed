import {findFlowVersion} from '../search.js'
import {fs, path} from '../../lib/node.js'

const INSTALLED_FLOW_VERSION = "0.22.1";

async function setup() {
  // Link the installed flow executable into the temp locations
  const flowPath =
    path.resolve(__dirname, '..', '..', 'node_modules', '.bin', 'flow');
  try {
    await fs.mkdir('/tmp/flow-search-test/bin');
    await fs.mkdir('/tmp/flow-search-test/node_modules/.bin');
    await fs.link(flowPath, '/tmp/flow-search-test/bin/flow')
    await fs.link(flowPath, '/tmp/flow-search-test/node_modules/.bin/flow')
  }
}

describe('the search command and associated helpers', () => {
  describe('findFlowVersion()', () => {
    pit('should return a flow version if there is a flow executable in the' +
    'path', async () => {
      await setup();
      // let version = await findFlowVersion();
      // console.log({version});
    })
  })
})
