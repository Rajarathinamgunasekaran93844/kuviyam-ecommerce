import {
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../context/authContextValue";
import { authAPI } from "../utils/api";
import { validateEmail } from "../utils/validators";
import LoginExperience from "../components/LoginExperience";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  /* ====================================== */
  /* STATES */
  /* ====================================== */

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  /* FORGOT PASSWORD */

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState("request");
  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  /* ====================================== */
  /* HANDLE INPUT CHANGE */
  /* ====================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* ====================================== */
  /* HANDLE LOGIN */
  /* ====================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!validateEmail(formData.email)) errors.email = "Please enter a valid email address.";
    if (!formData.password) errors.password = "Password is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await login({
        ...formData,
        email: formData.email.trim(),
      });
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      const backendError = err.response?.data?.message || "Invalid email or password.";
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  const resetForgotPasswordState = () => {
    setResetStep("request");
    setResetForm({
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    });
    setResetMessage("");
    setResetError("");
    setResetLoading(false);
  };

  const handleResetChange = (e) => {
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value,
    });
  };

  const requestPasswordReset = async () => {
    if (!validateEmail(resetForm.email)) {
      setResetError("Please enter a valid registered email.");
      setResetMessage("");
      return;
    }

    setResetLoading(true);
    setResetError("");
    setResetMessage("");

    try {
      const response = await authAPI.forgotPassword({
        email: resetForm.email,
      });
      setResetStep("reset");
      setResetMessage(response.data.message);
      toast.success("Password reset OTP sent.");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to send password reset OTP.";
      setResetError(message);
      toast.error(message);
    } finally {
      setResetLoading(false);
    }
  };

  const submitNewPassword = async () => {
    if (!resetForm.otp.trim()) {
      setResetError("Please enter the OTP.");
      return;
    }

    if (resetForm.password.length < 12) {
      setResetError("Password must be at least 12 characters long.");
      return;
    }

    if (resetForm.password !== resetForm.confirmPassword) {
      setResetError("Passwords do not match.");
      return;
    }

    setResetLoading(true);
    setResetError("");

    try {
      const response = await authAPI.resetPassword({
        email: resetForm.email,
        otp: resetForm.otp,
        password: resetForm.password,
        confirmPassword: resetForm.confirmPassword,
      });

      toast.success(response.data.message);
      setFormData((currentForm) => ({
        ...currentForm,
        email: resetForm.email,
        password: "",
      }));
      setShowForgotPassword(false);
      resetForgotPasswordState();
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to reset password.";
      setResetError(message);
      toast.error(message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <LoginExperience
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formData={formData}
      handleChange={handleChange}
      loading={loading}
      fieldErrors={fieldErrors}
      handleSubmit={handleSubmit}
      showForgotPassword={showForgotPassword}
      setShowForgotPassword={setShowForgotPassword}
      resetForgotPasswordState={resetForgotPasswordState}
      resetStep={resetStep}
      resetForm={resetForm}
      handleResetChange={handleResetChange}
      resetMessage={resetMessage}
      resetError={resetError}
      resetLoading={resetLoading}
      requestPasswordReset={requestPasswordReset}
      submitNewPassword={submitNewPassword}
    />
  );
};

export default Login;
