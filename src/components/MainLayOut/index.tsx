import React, { Fragment } from 'react'

export default function MainLayOut({
  children,
}: {
  children: React.ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
