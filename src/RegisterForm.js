import React, { useState, useMemo } from "react";
import "./App.css";

function validateName(v) {
  if (!v.trim()) return "Name is required.";
  if (v.trim().length < 2) return "Name must be at least 2 characters.";
  if (/^[^a-zA-Z]/.test(v.trim())) return "Name cannot start with a number or special character.";
  return "";
}

function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  const re = /^[^\s@]+@gmail\.com$/i;
  if (!re.test(v.trim())) return "Email must be a valid address ending in @gmail.com.";
  return "";
}

function validatePassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (!/[0-9]/.test(v)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']/.test(v)) return "Password must contain at least one special character.";
  return "";
}

function validateConfirm(v, password) {
  if (!v) return "Confirm your password.";
  if (v !== password) return "Passwords do not match.";
  return "";
}

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

function Field({ id, label, type, value, error, touched, onChange, onBlur, hint, showPasswordToggle, onTogglePassword }) {
  const showError = touched && error;
  
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="password-wrapper">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`field-input${showError ? " field-input-error" : ""}${showPasswordToggle ? " field-input-password" : ""}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={onTogglePassword}
            aria-label={type === "password" ? "Show password" : "Hide password"}
          >
            {type === "password" ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
      <div className="field-message">
        {showError ? (
          <p id={`${id}-error`} role="alert" className="field-error">
            {error}
          </p>
        ) : hint ? (
          <p className="field-hint">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const errors = useMemo(
    () => ({
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirm(values.confirmPassword, values.password),
    }),
    [values]
  );

  const isValid = Object.values(errors).every((e) => !e);

  const requirements = [
    { key: "name", label: "Name starts with a letter, 2+ characters", met: !validateName(values.name) },
    { key: "email", label: "Email ends with @gmail.com", met: !validateEmail(values.email) },
    {
      key: "password",
      label: "Password: 8+ characters, 1 number, 1 special character",
      met: !validatePassword(values.password),
    },
    {
      key: "confirmPassword",
      label: "Passwords match",
      met: values.confirmPassword.length > 0 && values.confirmPassword === values.password,
    },
  ];

  function handleChange(field) {
    return (e) => {
      const v = e.target.value;
      setValues((prev) => ({ ...prev, [field]: v }));
    };
  }

  function handleBlur(field) {
    return () => setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleReset() {
    setValues({ name: "", email: "", password: "", confirmPassword: "" });
    setTouched({ name: false, email: false, password: false, confirmPassword: false });
    setSubmitted(false);
    setSuccess(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (isValid) setSuccess(true);
  }

  if (success) {
    return (
      <div className="outer">
        <div className="card card-success">
          <div className="success-badge">✓</div>
          <h1 className="heading">Account created</h1>
          <p className="subtext">{values.name}, your account is ready.</p>
          <button onClick={handleReset} className="btn btn-outline">
            Register another account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="outer">
      <div className="layout">
        <form onSubmit={handleSubmit} className="card form-card" noValidate>
          <p className="eyebrow">SIDRAAYYY FORM</p>
          <h1 className="heading">Create your account</h1>
          <p className="subtext">All fields are required.</p>

          <Field
            id="name"
            label="Name"
            type="text"
            value={values.name}
            error={errors.name}
            touched={touched.name || submitted}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            touched={touched.email || submitted}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            hint="name@gmail.com"
          />
          <Field
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            error={errors.password}
            touched={touched.password || submitted}
            onChange={handleChange("password")}
            onBlur={handleBlur("password")}
            hint="8+ characters, 1 number, 1 special character"
            showPasswordToggle={true}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <Field
            id="confirmPassword"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            error={errors.confirmPassword}
            touched={touched.confirmPassword || submitted}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            showPasswordToggle={true}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <button type="submit" disabled={!isValid} className="btn btn-primary btn-full">
            Create account
          </button>
        </form>

        <aside className="card requirements-card">
          <p className="eyebrow eyebrow-dark">Requirements</p>
          <ul className="requirements-list">
            {requirements.map((r) => (
              <li key={r.key} className="requirement-item">
                <span className={`requirement-dot${r.met ? " requirement-dot-met" : ""}`}>
                  {r.met ? "✓" : ""}
                </span>
                <span className={`requirement-text${r.met ? " requirement-text-met" : ""}`}>
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}