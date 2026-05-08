import React, { useState, useEffect, useRef } from 'react'
import { LuChevronDown } from 'react-icons/lu';

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">

      {/* BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          px-3 py-2.5 rounded-xl text-sm text-white
          bg-white/5 border border-white/10
          backdrop-blur-xl
          hover:border-indigo-400/40
          transition-all duration-200
        "
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>

        <LuChevronDown
          className={`text-gray-300 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-indigo-300" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            absolute w-full mt-2 z-20
            rounded-xl overflow-hidden
            bg-[#0b0b14]/90 backdrop-blur-xl
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
          "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="
                px-3 py-2 text-sm cursor-pointer
                text-gray-300
                hover:bg-indigo-500/10 hover:text-white
                transition
              "
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default SelectDropdown;