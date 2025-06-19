"use client";
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

type DatePickerProps = React.ComponentProps<typeof ReactDatePicker> & {
  label?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-base font-semibold text-white mb-1">{label}</label>}
    <ReactDatePicker
      className="px-5 py-3 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg placeholder-white w-full bg-[#015c30] text-white"
      calendarClassName="custom-datepicker-calendar"
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={100}
      {...props}
    />
  </div>
);

export default DatePicker; 