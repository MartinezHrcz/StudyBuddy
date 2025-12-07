import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const PasswordChangeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    setStatus({ type: "", message: "" });

    if (formData.new_password.length < 8) {
      setStatus({ type: "error", message: "New password must be at least 8 characters long." });
      return false;
    }

    if (formData.new_password !== formData.confirm_password) {
      setStatus({ type: "error", message: "New password and confirm password do not match." });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await apiFetch("/api/auth/password_change/", {
        method: "POST",
        body: JSON.stringify({
          old_password: formData.current_password,
          new_password: formData.new_password,
        }),
      });

      setStatus({ type: "success", message: "Password updated successfully!" });
      setFormData({ current_password: "", new_password: "", confirm_password: "" });

      // Optional: Redirect after success
      setTimeout(() => {
        navigate("/profile");
      }, 2000);

    } catch (error) {
      console.error("Password change error:", error);
      setStatus({
        type: "error",
        message: error.detail || error.message || "Failed to update password. Please check your current password."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl">
        <button
          onClick={() => navigate("/profile")}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
        </button>

        <div className="text-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-600 tracking-wide">
            Change Password
          </h2>
          <p className="text-gray-500 mt-2">Ensure your account stays secure</p>
        </div>

        {status.message && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
              }`}
          >
            {status.type === "error" ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter new password (min. 8 chars)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
              }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
