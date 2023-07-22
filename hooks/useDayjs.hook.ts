import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import th from "dayjs/locale/th";

export const useDayjs = () => {
  dayjs.locale(th);

  return dayjs;
};
