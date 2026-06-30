export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(String(email || "").trim());
};

export const validatePhone = (phone) => {
  const phonePattern = /^[6-9]\d{9}$/;
  const cleanedPhone = String(phone || "").trim().replace(/[^0-9]/g, "");
  return phonePattern.test(cleanedPhone);
};

export const cleanPhone = (phone) => {
  return String(phone || "").trim().replace(/[^0-9]/g, "");
};