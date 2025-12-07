import React, { useState } from "react";

const PasswordChangeForm = () => {
  // 1. State for form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 2. State for messages (success/error)
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Simple validation function
  const validateForm = () => {
    setMessage("");
    setIsError(false);

    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters long.");
      setIsError(true);
      return false;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setIsError(true);
      return false;
    }

    return true;
  };

  // 3. Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Attempting to change password...");
    console.log("Current:", currentPassword);
    console.log("New:", newPassword);

    setTimeout(() => {
      setMessage("Password updated successfully!");
      setIsError(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Your Password</h2>

      {/* Display messages */}
      {message && (
        <p
          style={{
            ...styles.message,
            ...(isError ? styles.error : styles.success),
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Current Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="current-password" style={styles.label}>
            Current Password
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* New Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="new-password" style={styles.label}>
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Confirm New Password Field */}
        <div style={styles.formGroup}>
          <label htmlFor="confirm-password" style={styles.label}>
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Update Password
        </button>
      </form>
    </div>
  );
};

// Basic inline styles for a clean, simple look
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  message: {
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
};

export default PasswordChangeForm;
