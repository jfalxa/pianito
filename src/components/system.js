import React from 'react'
import Styled from 'react-systyle'

export const Box = Styled.with({
  display: 'flex',
  boxSizing: 'border-box'
})

export const Txt = Styled.as('span').with({
  display: 'inline-flex',
  boxSizing: 'border-box'
})

export const Fieldset = Box.as('fieldset')
export const Legend = Box.as('legend')
export const Form = Box.as('form').with({ flexDirection: 'column' })
export const Button = Box.as('button').with({ justifyContent: 'center' })
export const Row = Box.with({ '& *': { flex: 1 } })

export const NumberField = Box.as('input').with(({ onChange, ...props }) => ({
  ...props,
  type: 'number',
  onChange: e => onChange(e.target.value)
}))

export const Select = Box.as('select').with(
  ({ options, onChange, ...props }) => ({
    ...props,
    onChange: e => onChange(e.target.value),
    children: options.map(option => (
      <option key={option} value={option} children={option} />
    ))
  })
)
