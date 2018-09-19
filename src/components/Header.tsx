import { h } from "hyperapp"

import { Status } from "lib/logger/components"
import { State, Actions } from "api"
import { Link } from "lib/router"

import "./Header.scss"

export interface HeaderProps {
  state: State
  actions: Actions
}

export function Header(props: HeaderProps) {
  const { state, actions } = props
  return (
    <header class="header navbar">
      <section class="navbar-section">
        <Link href="/" class="navbar-brand mx-2">
          HA V1 Template
        </Link>
      </section>
      <section class="navbar-section">
        <Status state={state.logger} actions={actions.logger} />
      </section>
      <section>
        <Link href="/about">About Us</Link>
      </section>
    </header>
  )
}
