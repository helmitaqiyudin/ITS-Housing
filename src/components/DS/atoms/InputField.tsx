import React from 'react'
import {
    Input,
} from '@chakra-ui/react'

interface InputFieldInterface {
    placeholder?: string;
    type: string;
}

const InputField = (props: Partial<InputFieldInterface>) => {
  const {placeholder, type, ...nativeProps} = props;
  return (
    <Input placeholder={placeholder} type={type} {...nativeProps} />
  )
}

export default InputField