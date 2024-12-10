import { ReactNode } from "react";

export const formatDateDay = (dateDay: string): string | ReactNode => {
  if (!dateDay) {
    return null;
  }
  const dateDayObj = new Date(dateDay);
  if (new Date().getDay() === dateDayObj.getDay()) {
    return "Oggi";
  }
  return (
    <span style={{ textTransform: "capitalize" }}>
      {`
      ${dateDayObj.toLocaleDateString("default", {
        weekday: "long",
      })}
      ${dateDayObj.toLocaleDateString("default", {
        day: "numeric",
      })}
      `}
    </span>
  );
};
