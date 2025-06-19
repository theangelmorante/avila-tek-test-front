"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  Props as ReactSelectProps,
  StylesConfig,
  GroupBase,
  CSSObjectWithLabel,
} from "react-select";

export type Option = {
  value: string;
  label: string;
};

const ReactSelect = dynamic<ReactSelectProps<Option, false>>(
  () => import("react-select").then((mod) => mod.default),
  { ssr: false }
);

interface SelectProps extends ReactSelectProps<Option, false> {
  label?: string;
}

const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: "1rem",
    backgroundColor: "#015c30",
    boxShadow: "0 1px 4px #0001",
    minHeight: "3.25rem",
    paddingLeft: "0.5rem",
    fontSize: "1.125rem",
    color: "white"
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
    fontSize: "1.125rem",
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
    fontSize: "1.125rem",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: "1rem",
    fontSize: "1.125rem",
    backgroundColor: "#015c30",
    color: "white",
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#1976D2"
      : state.isFocused
        ? "#1565C0"
        : "#015c30",
    color: "white",
    cursor: "pointer",
    borderRadius: "10px"
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
  }),
};

const Select: React.FC<SelectProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label className="text-base font-semibold text-white mb-1">
        {label}
      </label>
    )}
    <ReactSelect
      classNamePrefix="react-select"
      styles={customStyles}
      {...props}
    />
  </div>
);

export default Select; 