export interface User {
  id: string
  email: string
  displayName: string
}

export interface StringMap<T> {
  [key: string]: T
}
