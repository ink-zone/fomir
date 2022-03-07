# Fomir

A Schema-First form library

[![npm](https://img.shields.io/npm/v/fomir.svg)](https://www.npmjs.com/package/fomir)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/fomir.svg)](https://bundlephobia.com/result?p=fomir)
[![NPM Downloads](https://img.shields.io/npm/dm/fomir.svg?style=flat)](https://www.npmjs.com/package/fomir)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation

```bash
npm install fomir fomir-react
```

## Quick Start

```jsx
function BasicForm() {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
    children: [
      {
        label: 'First Name',
        name: 'firstName',
        component: 'Input',
        value: '',
      },
      {
        label: 'Last Name',
        name: 'lastName',
        component: 'Input',
        value: '',
      },
      {
        component: 'Submit',
        text: 'submit',
      },
    ],
  })

  return <Form form={form} />
}
```

## Markup Schema

Fomir also supports building form using markup.

```jsx
function BasicForm() {
  const form = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
      console.log('values', values)
    },
  })

  return (
    <Form form={form}>
      <h2>Basic Info</h2>
      <Box bgGray100 rounded p3 mb4>
        <Field component="Input" label="First Name" name="firstName" />
        <Field component="Input" label="Last Name" name="lastName" />
      </Box>

      <h2>Extra Info</h2>
      <Box bgGray100 rounded p3 mb4>
        <Field component="Input" label="Email" name="email" />
        <Field component="Textarea" label="Bio" name="bio" />
      </Box>

      <button>Submit</button>
    </Form>
  )
}
```

## Documentation

Documentation website: [fomir.vercel.app](https://fomir.vercel.app/)

## Development

- [Contributing Guide](/CONTRIBUTING.md)

## License

[MIT License](https://github.com/forsigner/fomir/blob/master/LICENSE)
