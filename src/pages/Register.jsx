import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContextValue";
import { validateEmail, validatePhone, cleanPhone } from "../utils/validators";
import { otpAPI } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [step, setStep] = useState(1); // 1: Enter details, 2: Verify OTP
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState({ email: false, phone: false });
  const [otpVerified, setOtpVerified] = useState({ email: false, phone: false });
  const [otpInput, setOtpInput] = useState({ email: "", phone: "" });
  const [resendTimer, setResendTimer] = useState({ email: 0, phone: 0 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setResendTimer(prev => ({
        email: prev.email > 0 ? prev.email - 1 : 0,
        phone: prev.phone > 0 ? prev.phone - 1 : 0
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!validateEmail(formData.email)) errors.email = "Please enter a valid email address.";
    if (!validatePhone(formData.phone)) errors.phone = "Please enter a valid 10-digit phone number starting with 6-9.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    if (!formData.password || formData.password.length < 6) errors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOTP = async (type) => {
    if (type === 'email' && !validateEmail(formData.email)) {
      setFieldErrors({ email: "Enter valid email first" });
      return;
    }
    if (type === 'phone' && !validatePhone(formData.phone)) {
      setFieldErrors({ phone: "Enter valid phone first" });
      return;
    }

    setOtpLoading(prev => ({ ...prev, [type]: true }));
    try {
      const value = type === 'phone' ? cleanPhone(formData.phone) : formData.email;
      await otpAPI.sendOTP({ type, value });
      setResendTimer(prev => ({ ...prev, [type]: 60 }));
      toast.success(`OTP sent to ${type === 'email' ? 'email' : 'phone'}! Check console for OTP (demo)!`);
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to send OTP to ${type}`);
    } finally {
      setOtpLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleVerifyOTP = async (type) => {
    if (!otpInput[type]) return;
    setOtpLoading(prev => ({ ...prev, [type]: true }));
    try {
      const value = type === 'phone' ? cleanPhone(formData.phone) : formData.email;
      await otpAPI.verifyOTP({ type, value, otp: otpInput[type] });
      setOtpVerified(prev => ({ ...prev, [type]: true }));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verified!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: cleanPhone(formData.phone),
        address: formData.address,
        password: formData.password,
      });
      toast.success("Registration successful!");
      navigate("/profile");
    } catch (err) {
      const backendError = err.response?.data?.message || "Registration failed.";
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-purple-100 via-brand-gold-50 to-brand-teal-100 flex items-center justify-center px-4 py-10">
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🌈</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">📚</div>
      <div className="absolute top-1/2 left-20 text-5xl opacity-20 animate-spin">⭐</div>

      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.15)] border border-white p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 text-white shadow-xl mb-4">
            <Sparkles size={38} />
          </div>
          <h1 className="text-5xl font-black text-gray-900">
            {step === 1 ? "Sign Up" : "Verify Account"}
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            {step === 1 
              ? "Create your Kuviyam Publications account ✨" 
              : "Verify your email and phone number to continue"}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={(e) => {
            e.preventDefault();
            if (validateStep1()) setStep(2);
          }} className="space-y-6">
            <div className="relative">
              <User size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-purple-400" />
              <input
                type="text" name="name" placeholder="Full Name"
                value={formData.name} onChange={handleChange} required
                className={`w-full h-[70px] rounded-2xl border-2 ${fieldErrors.name ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-5 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
              />
              {fieldErrors.name && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Mail size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-purple-400" />
                <input
                  type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange} required
                  className={`w-full h-[70px] rounded-2xl border-2 ${fieldErrors.email ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-5 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
                />
                {fieldErrors.email && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.email}</p>}
              </div>

              <div className="relative">
                <Phone size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-purple-400" />
                <input
                  type="tel" name="phone" placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange} required
                  className={`w-full h-[70px] rounded-2xl border-2 ${fieldErrors.phone ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-5 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
                />
                {fieldErrors.phone && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.phone}</p>}
              </div>
            </div>

            <div className="relative">
              <MapPin size={22} className="absolute left-5 top-8 text-brand-purple-400" />
              <textarea
                name="address" placeholder="Address" rows={4}
                value={formData.address} onChange={handleChange} required
                className={`w-full rounded-2xl border-2 ${fieldErrors.address ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-5 py-5 text-lg outline-none resize-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
              />
              {fieldErrors.address && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Lock size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-purple-400" />
                <input
                  type={showPassword ? "text" : "password"} name="password" placeholder="Create Password"
                  value={formData.password} onChange={handleChange} required
                  className={`w-full h-[70px] rounded-2xl border-2 ${fieldErrors.password ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-16 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
                {fieldErrors.password && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.password}</p>}
              </div>

              <div className="relative">
                <Lock size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-purple-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password"
                  value={formData.confirmPassword} onChange={handleChange} required
                  className={`w-full h-[70px] rounded-2xl border-2 ${fieldErrors.confirmPassword ? 'border-red-400' : 'border-gray-200'} bg-white/80 pl-14 pr-16 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition`}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                  {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
                {fieldErrors.confirmPassword && <p className="text-red-500 text-sm font-semibold mt-2">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[72px] rounded-2xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 hover:from-brand-purple-600 hover:to-brand-teal-600 text-white text-xl font-black shadow-2xl hover:scale-[1.02] transition duration-300 flex items-center justify-center gap-2">
              Continue to Verify
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitStep2} className="space-y-6">
            {[
              { type: 'email', label: 'Email Address', value: formData.email },
              { type: 'phone', label: 'Phone Number', value: formData.phone }
            ].map(({ type, label, value }) => (
              <div key={type} className="bg-gray-50 rounded-[30px] p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-700 font-bold">{label}: {value}</p>
                  {otpVerified[type] && (
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                      <CheckCircle2 size={20} /> Verified
                    </div>
                  )}
                </div>

                {!otpVerified[type] && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
                      <input
                        type="text" placeholder={`Enter OTP sent to ${type}`}
                        value={otpInput[type]}
                        onChange={(e) => setOtpInput({ ...otpInput, [type]: e.target.value })}
                        className="w-full h-[60px] rounded-2xl border-2 border-gray-200 bg-white px-5 text-lg outline-none focus:border-brand-purple-400 focus:ring-4 focus:ring-brand-purple-100 transition"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleVerifyOTP(type)}
                          disabled={otpLoading[type] || !otpInput[type]}
                          className="px-6 bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 hover:from-brand-purple-600 hover:to-brand-teal-600 text-white font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center">
                          {otpLoading[type] ? <Loader2 size={20} className="animate-spin" /> : "Verify"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendOTP(type)}
                          disabled={resendTimer[type] > 0 || otpLoading[type]}
                          className="px-6 bg-brand-purple-100 hover:bg-brand-purple-200 text-brand-purple-700 font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition">
                          {resendTimer[type] > 0 ? `${resendTimer[type]}s` : "Resend"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 h-[60px] rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition">
                Back
              </button>
              <button
                type="submit"
                disabled={!otpVerified.email || !otpVerified.phone || loading}
                className="flex-1 h-[60px] rounded-2xl bg-gradient-to-r from-brand-purple-500 to-brand-teal-500 hover:from-brand-purple-600 hover:to-brand-teal-600 text-white font-black shadow-xl hover:scale-[1.02] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Complete Signup"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-lg">Already have an account?</p>
          <Link to="/login" className="inline-block mt-3 text-brand-purple-500 text-lg font-black hover:underline">
            Login Here ✨
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
