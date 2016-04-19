// @flow
import {getGHLibsAndFlowVersions, filterDefs, formatDefTable}
  from "../lib/libDef.js";
import type {LibDefWithFlow} from "../lib/libDef.js";
import {child_process, path, child_process} from '../lib/node'

const P = Promise;

export const name = "search";
export const description =
  "Performs a simple search (by name) of available libdefs";

export async function findFlowVersion(
  pwd?: string
): Promise<string> {
  const _pwd = pwd || __dirname
  const nodeModulesBin = path.resolve(_pwd, 'node_modules', '.bin')
  const _path = `${nodeModulesBin}:${process.env.PATH}`

  function fail() {
    console.error('Couldn\'t identify your flow version. Please make sure ' +
    'flow is installed and in your PATH, or flow-bin is installed ' +
    'in your project.')
    return 'No version found'
  }

  let output : string = ''

  try {
    output = await child_process.execAsync('flow version', {
      env: {PATH: _path}
    })
  } catch(e) {
    return fail()
  }

  const matches = output.match(/.*version (.*)\n$/)
  if (!matches || !matches[1]) {
    return fail()
  } else {
    return matches[1]
  }
}

export async function searchVersions(
  searchTerm: string,
  flowVersion?: string
) {
  const defs = await getGHLibsAndFlowVersions();
  const filtered = filterDefs(searchTerm, defs, flowVersion);
  return filtered;
}

export async function run(args: {}): Promise<number> {
  if (!args._ || !args._.length > 1) {
    console.error('Please provide a term for which to search!')
    return 1;
  }
  const term = args._[1]
  const flowVersion = args.flowVersion || await findFlowVersion()
  const versions = await searchVersions(term, flowVersion)
  console.log(formatDefTable(versions))
  return 0;
};
