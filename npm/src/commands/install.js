// @flow
import {searchVersions} from './search.js';
import _ from 'lodash/fp';
import type {LibDefWithFlow} from '../lib/libDef.js';

const P = Promise;

export const name = "install";
export const description =
  "Installs a libdef <name>@<version>";

type SearchArgs = Array<{
  libName: string,
  versionString: string
}>;

export async function getInstallableVersions(
  args: {}
) {
  const versions = await searchVersions(args)

  const searchArgs : SearchArgs = _.compact(
    _.map((arg: string) => {
      let matches = arg.match(/(.*)@(.*)/)
      if (!matches) {
        return null
      }
      return {libName: matches[1], versionString: matches[2]}
    }, args._ || [])
  )

  let onlySpecifiedLibNames = (version: LibDefWithFlow) => {
    return version.pkgName
  }

  versions.filter(v => onlySpecifiedLibNames)
}

export async function run(args: {}): Promise<number> {
  if (!args._ || !args._.length > 1) {
    console.error('Please provide a term for which to search!')
    return 1;
  }


  return 0;
};
