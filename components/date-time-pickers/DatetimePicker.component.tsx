import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useDayjs } from "@/hooks/useDayjs.hook";
import { DateFormatConstant } from "@/constants/date-format.constant";

type IProps = {
  date: any;
  onSelect?: Function;
  placeholder?: string;
  displayFormat?: string;
  isReadOnly?: boolean;
  disabled?: boolean;
};

export const DatetimePicker = ({
  date,
  onSelect,
  placeholder = "Select Date",
  displayFormat = "DD MMMM YYYY",
  isReadOnly = false,
  disabled = false,
}: IProps) => {
  const dayjs = useDayjs();
  const [value, setValue] = useState<any>({
    startDate: dayjs(date).format(DateFormatConstant.DB_DATE),
    endDate: dayjs(date).format(DateFormatConstant.DB_DATE),
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    if (onSelect) {
      onSelect(newValue.startDate);
    }
  };

  return (
    <div className="w-full border rounded-lg  cursor-pointer">
      <Datepicker
        inputClassName="w-full  font-normal p-2 bg-gray-50"
        i18n={"th"}
        primaryColor={"teal"}
        placeholder={placeholder}
        displayFormat={displayFormat}
        value={value}
        onChange={handleValueChange}
        showShortcuts={true}
        asSingle={true}
        useRange={false}
        showFooter={true}
        readOnly={isReadOnly}
        disabled={disabled}
        configs={{
          shortcuts: {
            today: "วันนี้",
            yesterday: "เมื่อวาน",
            past: (period) => `เมื่อ ${period} วันก่อน`,
            currentMonth: "เดือนนี้",
            pastMonth: "เดือนที่แล้ว",
          },
          footer: {
            cancel: "ยกเลิก",
            apply: "ยืนยัน",
          },
        }}
      />
    </div>
  );
};
