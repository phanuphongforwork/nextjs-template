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
  max: (name: string, arg: number) => {
    return `${name} ต้องมีขนาดไม่เกิน ${arg} ตัวอักษร`;
  },
  pattern: (name: string) => {
    return `${name} ไม่ตรงกับรูปแบบที่กำหนด`;
  },
  minLength: (name: string, arg: number) => {
    return `${name} ต้องมีอย่างน้อย ${arg} ตัวอักษร`;
  },
  maxLength: (name: string, arg: number) => {
    return `${name} ต้องมีไม่เกิน ${arg} ตัวอักษร`;
  },
  validate: (name: string) => {
    return `ค่า ${name} ไม่ถูกต้อง`;
  },
  integer: (name: string) => {
    return `${name} ต้องเป็นจำนวนเต็มเท่านั้น`;
  },
  positive: (name: string) => {
    return `${name} ต้องเป็นค่าบวกเท่านั้น`;
  },
  negative: (name: string) => {
    return `${name} ต้องเป็นค่าลบเท่านั้น`;
  },
  url: (name: string) => {
    return `${name} ต้องเป็น URL ที่ถูกต้อง`;
  },
  alpha: (name: string) => {
    return `${name} ต้องมีเฉพาะตัวอักษรเท่านั้น`;
  },
  alphaNumeric: (name: string) => {
    return `${name} ต้องมีเฉพาะตัวอักษรและตัวเลขเท่านั้น`;
  },
  matchField: (name: string, field: string) => {
    return `${name} ต้องตรงกับ ${field}`;
  },
  date: (name: string) => {
    return `${name} ต้องเป็นวันที่ที่ถูกต้อง`;
  },
  time: (name: string) => {
    return `${name} ต้องเป็นเวลาที่ถูกต้อง`;
  },
  phoneNumber: (name: string) => {
    return `${name} ต้องเป็นหมายเลขโทรศัพท์ที่ถูกต้อง`;
  },
  strongPassword: (name: string) => {
    return `${name} ต้องมีความยากในการเดา`;
  },
  fileFormat: (name: string, format: string) => {
    return `${name} ต้องเป็นไฟล์ในรูปแบบ ${format}`;
  },
};
