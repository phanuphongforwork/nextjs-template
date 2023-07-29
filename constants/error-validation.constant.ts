export const ErrorValidationMessage: any = {
  required: (name: string) => {
    return `กรุณากรอก ${name}`;
  },
  email: (name: string) => {
    return `${name} ต้องอยู่ในรูปแบบอีเมล์`;
  },
  unique: (name: string) => {
    return `${name} มีอยู่ในระบบแล้ว`;
  },
  oneOf: (name: string) => {
    return `${name} ไม่ตรงกัน`;
  },
  length: (name: string, arg: number) => {
    return `${name} ต้องมีขนาด ${arg} ตัวอักษร`;
  },
  min: (name: string, arg: number) => {
    return `${name} ต้องมีขนาด ${arg} ตัวอักษรขึ้นไป`;
  },
};
