/**
 * check form is valid
 * @param errors errors object
 */
export function isFormValid(errors: any = {}): boolean {
  let valid = true
  function loopErrors(errors: any) {
    for (const key of Object.keys(errors)) {
      let error = errors[key]
      if (!error) continue // skip it

      if (typeof error === 'object') {
        loopErrors(error)
      } else {
        error = String(error) as string
        valid = error.length ? false : true
      }
    }
  }
  loopErrors(errors)
  return valid
}
