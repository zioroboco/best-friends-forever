/**
 * Strip BFF version from an incoming path (i.e. `/v1/path` -> `/path`).
 */
export function stripVersion(path: string) {
  return path.replace(/^\/[^\/]+/, "")
}

/**
 * Add a stub BFF version to an incoming path (i.e. `/path` -> `/?/path`).
 */
export function stubVersion(path: string) {
  return `/?${path}`
}
