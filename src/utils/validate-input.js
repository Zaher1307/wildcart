const validator = require('validator')

const inputTypes = {
  LOGIN: 0,
  REGISTER: 1,
  POST_PRODUCT: 2
}

function validateRegister(registerData) {
  const {
    userName, email, firstName, lastName, password,
    phoneNumber, address, shopName, userType
  } = registerData

  if (
    !userName || !email || !firstName || !lastName || !password ||
    !phoneNumber || !address || !userType
  ) {
    return 'required fields are missing'
  }

  if (userType === 'seller' && !shopName) {
    return 'required fields are missing'
  }

  if (!validator.isStrongPassword(password)) {
    return 'weak password'
  }

  if (!validator.isEmail(email)) {
    return 'invalid email'
  }

  if (!validator.isMobilePhone(phoneNumber)) {
    return 'invalid phone number'
  }

  return null
}

function validateLogin(loginData) {
  const { userNameOrEmail, password } = loginData
  if (!userNameOrEmail || !password) {
    return 'required fields are missing'
  }
  return null
}

function validateProduct(productData) {
  const { name, brand, quantity, price, categories } = productData
  if (!name || !brand || !quantity || !price || !categories) {
    return 'missing fields are required'
  }
  return null
}

function validateInput(input, inputType) {
  switch (inputType) {
    case inputTypes.REGISTER:
      return validateRegister(input)
    case inputTypes.LOGIN:
      return validateLogin(input)
    case inputTypes.POST_PRODUCT:
      return validateProduct(input)
  }
}

module.exports = {
  inputTypes,
  validateInput
}
