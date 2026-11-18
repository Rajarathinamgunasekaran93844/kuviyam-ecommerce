import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContextValue";
import AuthStoryPanel from "../components/AuthStoryPanel";
import { validateEmail, validatePhone, cleanPhone } from "../utils/validators";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!validateEmail(formData.email)) errors.email = "Please enter a valid email address.";
    if (!validatePhone(formData.phone)) errors.phone = "Please enter a valid 10-digit phone number starting with 6-9.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    if (formData.password.length < 12) errors.password = "Password must be at least 12 characters long.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: cleanPhone(formData.phone),
        address: formData.address.trim(),
        password: formData.password,
      });
      toast.success("Registration successful!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page register-page">
      <div className="login-page-glow login-page-glow--top" aria-hidden="true" />
      <div className="login-page-glow login-page-glow--bottom" aria-hidden="true" />

      <div className="login-shell">
        <AuthStoryPanel />

        <section className="login-form-panel register-form-panel" aria-labelledby="register-heading">
          <Link to="/" className="login-back-link">
            <ArrowLeft size={16} /> Back to the bookstore
          </Link>

          <div className="login-form-heading">
            <span className="login-form-kicker"><span /> JOIN PAACHCHARAM</span>
            <h1 id="register-heading">Create an account</h1>
            <p>Save your details and keep your family’s next favourite read close by.</p>
          </div>

          <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="register-name">Full name</label>
              <div className={`login-control${fieldErrors.name ? " has-error" : ""}`}>
                <User className="login-control-icon" size={18} aria-hidden="true" />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "register-name-error" : undefined}
                  required
                />
              </div>
              {fieldErrors.name && <p id="register-name-error" className="login-field-error" role="alert">{fieldErrors.name}</p>}
            </div>

            <div className="register-fields-pair">
              <div className="login-field">
                <label htmlFor="register-email">Email address</label>
                <div className={`login-control${fieldErrors.email ? " has-error" : ""}`}>
                  <Mail className="login-control-icon" size={18} aria-hidden="true" />
                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "register-email-error" : undefined}
                    required
                  />
                </div>
                {fieldErrors.email && <p id="register-email-error" className="login-field-error" role="alert">{fieldErrors.email}</p>}
              </div>

              <div className="login-field">
                <label htmlFor="register-phone">Phone number</label>
                <div className={`login-control${fieldErrors.phone ? " has-error" : ""}`}>
                  <Phone className="login-control-icon" size={18} aria-hidden="true" />
                  <input
                    id="register-phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? "register-phone-error" : undefined}
                    required
                  />
                </div>
                {fieldErrors.phone && <p id="register-phone-error" className="login-field-error" role="alert">{fieldErrors.phone}</p>}
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="register-address">Address</label>
              <div className={`login-control register-address-control${fieldErrors.address ? " has-error" : ""}`}>
                <MapPin className="login-control-icon" size={18} aria-hidden="true" />
                <textarea
                  id="register-address"
                  name="address"
                  placeholder="Your delivery address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  aria-invalid={Boolean(fieldErrors.address)}
                  aria-describedby={fieldErrors.address ? "register-address-error" : undefined}
                  required
                />
              </div>
              {fieldErrors.address && <p id="register-address-error" className="login-field-error" role="alert">{fieldErrors.address}</p>}
            </div>

            <div className="register-fields-pair">
              <div className="login-field">
                <label htmlFor="register-password">Password</label>
                <div className={`login-control${fieldErrors.password ? " has-error" : ""}`}>
                  <LockKeyhole className="login-control-icon" size={18} aria-hidden="true" />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="At least 12 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={12}
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? "register-password-error" : undefined}
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
                {fieldErrors.password && <p id="register-password-error" className="login-field-error" role="alert">{fieldErrors.password}</p>}
              </div>

              <div className="login-field">
                <label htmlFor="register-confirm-password">Confirm password</label>
                <div className={`login-control${fieldErrors.confirmPassword ? " has-error" : ""}`}>
                  <LockKeyhole className="login-control-icon" size={18} aria-hidden="true" />
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={12}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    aria-describedby={fieldErrors.confirmPassword ? "register-confirm-password-error" : undefined}
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p id="register-confirm-password-error" className="login-field-error" role="alert">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>

            <div className="login-form-options register-security-note">
              <span><ShieldCheck size={15} /> Your details stay safe with us.</span>
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              <span>{loading ? "Creating your account…" : "Create your account"}</span>
              {loading ? <span className="login-spinner" aria-hidden="true" /> : <ArrowRight size={18} />}
            </button>
          </form>

          <div className="login-signup">
            <p>Already have an account?</p>
            <Link to="/login">Sign in <ArrowRight size={16} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
