const regex = /^[a-zA-Z0-9]+$/

export function isAlphaNum(username){
    return regex.test(username)
}

export function isEmail(email){
    return email.includes("@")
}

export function isNotEmpty(value){
    return value.trim() !== ""
}

export function hasMinLength(value, minLength){
    return value.length >= minLength
}

export function hasMaxLength(value, maxLength){
    return value.length <= maxLength
}

export function isEqualToOtherValue(value1, value2){
    return value1 === value2
}