const validator = require('validator')

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

module.exports = validateRegister
