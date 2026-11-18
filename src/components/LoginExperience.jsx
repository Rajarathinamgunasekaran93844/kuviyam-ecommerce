import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthStoryPanel from "./AuthStoryPanel";

const LoginExperience = ({
  showPassword,
  setShowPassword,
  formData,
  handleChange,
  loading,
  fieldErrors,
  handleSubmit,
  showForgotPassword,
  setShowForgotPassword,
  resetForgotPasswordState,
  resetStep,
  resetForm,
  handleResetChange,
  resetMessage,
  resetError,
  resetLoading,
  requestPasswordReset,
  submitNewPassword,
}) => (
  <main className="login-page">
    <div className="login-page-glow login-page-glow--top" aria-hidden="true" />
    <div className="login-page-glow login-page-glow--bottom" aria-hidden="true" />

    <div className="login-shell">
      <AuthStoryPanel />

      <section className="login-form-panel" aria-labelledby="login-heading">
        <Link to="/" className="login-back-link">
          <ArrowLeft size={16} /> Back to the bookstore
        </Link>

        <div className="login-form-heading">
          <span className="login-form-kicker"><span /> YOUR READING SPACE</span>
          <h1 id="login-heading">Welcome back<span>!</span></h1>
          <p>Sign in to pick up right where you left off.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="login-email">Email address</label>
            <div className={`login-control${fieldErrors.email ? " has-error" : ""}`}>
              <Mail className="login-control-icon" size={18} aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
                required
              />
            </div>
            {fieldErrors.email && <p id="login-email-error" className="login-field-error" role="alert">{fieldErrors.email}</p>}
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <div className={`login-control${fieldErrors.password ? " has-error" : ""}`}>
              <LockKeyhole className="login-control-icon" size={18} aria-hidden="true" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.password && <p id="login-password-error" className="login-field-error" role="alert">{fieldErrors.password}</p>}
          </div>

          <div className="login-form-options">
            <span><ShieldCheck size={15} /> Secure sign-in</span>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="login-forgot-link"
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            <span>{loading ? "Signing you in…" : "Sign in to your account"}</span>
            {loading ? <span className="login-spinner" aria-hidden="true" /> : <ArrowRight size={18} />}
          </button>
        </form>

        <div className="login-signup">
          <p>New to the reading club?</p>
          <Link to="/register">Create an account <ArrowRight size={16} /></Link>
        </div>

        <p className="login-privacy-note"><LockKeyhole size={14} /> Your details stay safe with us.</p>
      </section>
    </div>

    {showForgotPassword && (
      <div className="login-modal-backdrop">
        <section
          className="login-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-heading"
          aria-describedby="reset-description"
        >
          <button
            type="button"
            className="login-modal-close"
            aria-label="Close password reset"
            onClick={() => {
              setShowForgotPassword(false);
              resetForgotPasswordState();
            }}
          >
            <X size={19} />
          </button>

          <div className="login-modal-icon"><LockKeyhole size={21} /></div>
          <span className="login-form-kicker"><span /> ACCOUNT RECOVERY</span>
          <h2 id="reset-heading">{resetStep === "request" ? "Forgot password?" : "Choose a new password"}</h2>
          <p id="reset-description" className="login-modal-description">
            {resetStep === "request"
              ? "Enter the email linked to your account and we’ll send you a reset code."
              : "Enter the code we sent you, then choose a new password."}
          </p>

          {resetMessage && <p className="login-reset-message" role="status">{resetMessage}</p>}
          {resetError && <p className="login-reset-error" role="alert">{resetError}</p>}

          {resetStep === "request" ? (
            <div className="login-modal-fields">
              <div className="login-field">
                <label htmlFor="reset-email">Email address</label>
                <div className="login-control">
                  <Mail className="login-control-icon" size={18} aria-hidden="true" />
                  <input
                    id="reset-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={resetForm.email}
                    onChange={handleResetChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <button type="button" className="login-submit" onClick={requestPasswordReset} disabled={resetLoading}>
                <span>{resetLoading ? "Sending reset code…" : "Send reset code"}</span>
                {resetLoading ? <span className="login-spinner" aria-hidden="true" /> : <ArrowRight size={18} />}
              </button>
            </div>
          ) : (
            <div className="login-modal-fields">
              <div className="login-field">
                <label htmlFor="reset-otp">Reset code</label>
                <input
                  className="login-plain-input"
                  id="reset-otp"
                  type="text"
                  name="otp"
                  placeholder="Enter your code"
                  value={resetForm.otp}
                  onChange={handleResetChange}
                  autoComplete="one-time-code"
                  required
                />
              </div>
              <div className="login-field">
                <label htmlFor="reset-password">New password</label>
                <input
                  className="login-plain-input"
                  id="reset-password"
                  type="password"
                  name="password"
                  placeholder="At least 12 characters"
                  value={resetForm.password}
                  onChange={handleResetChange}
                  autoComplete="new-password"
                  minLength={12}
                  required
                />
              </div>
              <div className="login-field">
                <label htmlFor="reset-confirm-password">Confirm new password</label>
                <input
                  className="login-plain-input"
                  id="reset-confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter it once more"
                  value={resetForm.confirmPassword}
                  onChange={handleResetChange}
                  autoComplete="new-password"
                  minLength={12}
                  required
                />
              </div>
              <button type="button" className="login-submit" onClick={submitNewPassword} disabled={resetLoading}>
                <span>{resetLoading ? "Updating password…" : "Update password"}</span>
                {resetLoading ? <span className="login-spinner" aria-hidden="true" /> : <ArrowRight size={18} />}
              </button>
            </div>
          )}

          <p className="login-modal-footnote">Remembered it? <button type="button" onClick={() => { setShowForgotPassword(false); resetForgotPasswordState(); }}>Return to sign in</button></p>
        </section>
      </div>
    )}
  </main>
);

export default LoginExperience;
