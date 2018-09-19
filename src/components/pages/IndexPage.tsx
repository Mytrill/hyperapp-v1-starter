import { h } from "hyperapp"

import { State, Actions } from "api"

import "./IndexPage.scss"

export interface IndexPageProps {
  state: State
  actions: Actions
}

export function IndexPage(props: IndexPageProps) {
  return (
    <div>
      <h1>Index Page</h1>
      <pre>{JSON.stringify(props.state, null, 2)}</pre>
    </div>
  )
}
