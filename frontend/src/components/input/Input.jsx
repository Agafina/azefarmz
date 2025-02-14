import React, { useState } from "react";
import "./Input.css";

const FloatingInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  label,
  required = false,
  validate,
  error,
  className = "",
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const [localError, setLocalError] = useState("");

  // Combine external and local error
  const displayError = error || localError;

  const handleBlur = (e) => {
    setTouched(true);

    // Run validation if provided
    if (validate) {
      const validationError = validate(e.target.value);
      setLocalError(validationError || "");
    }

    // Call parent onBlur if provided
    if (onBlur) {
      onBlur(e);
    }
  };

  // Determine if we should show the floating label
  const isOccupied = value !== undefined && value !== "";

  // Generate unique id if not provided
  const inputId = id || `${name}-${Math.random().toString(36).substring(2, 9)}`;

  // Determine component type (input, textarea, or select)
  const getInputElement = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            className={`floating-input ${isOccupied ? "occupied" : ""} ${
              displayError ? "has-error" : ""
            }`}
            placeholder=" "
            required={required}
            {...props}
          />
        );
      case "select":
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            className={`floating-input ${isOccupied ? "occupied" : ""} ${
              displayError ? "has-error" : ""
            }`}
            required={required}
            {...props}
          >
            <option value="" disabled></option>
            {props.children}
          </select>
        );
      default:
        return (
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            className={`floating-input ${isOccupied ? "occupied" : ""} ${
              displayError ? "has-error" : ""
            }`}
            placeholder=" "
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`floating-field-container ${className}`}>
      <div className="floating-field">
        {getInputElement()}
        <label htmlFor={inputId} className={isOccupied ? "floating" : ""}>
          {label} {required && <span className="required-mark">*</span>}
        </label>
      </div>
      {touched && displayError && (
        <div className="input-error">{displayError}</div>
      )}
    </div>
  );
};

export default FloatingInput;
