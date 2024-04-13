export enum CommonInputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  PHONE = 'phone',
  FULLNAME = 'name',
  POSTCODE = 'post_code',
  URL = 'url'
}

export enum KeyInputConfig {
  EMAIL = 'INPUT_EMAIL',
  PASSWORD = 'INPUT_PASSWORD',
  PHONE = 'INPUT_PHONE',
  FULLNAME = 'INPUT_FULLNAME',
  POSTCODE = 'INPUT_POSTCODE',
  URL = 'INPUT_URL'
}

type inputsRegexsConfig = {
  [key in KeyInputConfig]: string;
}

type inputsTypesConfig = {
  [key in CommonInputType]: string;
}
