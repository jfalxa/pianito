import React from 'react'
import Styled from 'react-systyle'
import { inputChange } from '../helpers'

export const Box = Styled.with({
  display: 'flex',
  boxSizing: 'border-box'
})

export const Txt = Styled.as('span').with({
  display: 'inline-flex',
  boxSizing: 'border-box'
})

export const Fieldset = Box.as('fieldset').with({ px: 6, pb: 6 })

export const Legend = Box.as('legend')

export const Form = Box.as('form').with({ flexDirection: 'column' })

export const Button = Box.as('button').with({
  type: 'button',
  justifyContent: 'center'
})

export const Row = Box.with({ '& *': { flex: 1 } })

export const TextArea = Box.as('textarea').with(inputChange)

export const Input = Box.as('input').with(inputChange, { type: 'text' })

export const NumberField = Input.with({ type: 'number' })

export const Checkbox = Txt.as('label').with(
  ({ checked, label, onChange, ...props }) => ({
    ...props,
    children: [
      <Input key="0" type="checkbox" checked={checked} onChange={onChange} />,
      label
    ]
  })
)

export const Select = Box.as('select').with(
  inputChange,
  { height: 21 },
  ({ options, ...props }) => ({
    ...props,
    children: options.map(({ value, label, props = null }) => (
      <option key={value} value={value} children={label} {...props} />
    ))
  })
)

export const Screen = Box.with({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  flexDirection: 'column',
  p: 16
})

export const Pane = Box.with({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})
