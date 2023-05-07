const PREFIX = 'jotai-devtools';
/**
 * Generates a key for local storage based on the key and version
 * @param key - the key to use
 * @param version - the version to apply
 * @returns the generated key
 */
export const generateLocalStorageKey = <
  const Key extends string,
  const Version extends string | number,
>(
  key: Key,
  version: Version,
): `${typeof PREFIX}-${Key}-V${Version}` => {
  return `${PREFIX}-${key}-V${version}`;
};
