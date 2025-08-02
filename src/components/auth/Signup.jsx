import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// ✅ Joi Schema
const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required!",
    "string.min": "Name must be at least 3 characters!",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required!",
    "string.email": "Must be a valid email!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required!",
    "string.min": "Password must be at least 6 characters!",
  }),
  confirmPassword: Joi.any().equal(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match!",
    "any.required": "Please confirm your password!",
  }),
});

function SignUp({ theme }) {
  const navigate = useNavigate();
  const { register: registerUser, isLoading: authLoading, error: authError, clearError } = useAuth();
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    setLocalError("");
    setSuccess("");

    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });

      if (response.success) {
        setSuccess(response.message);
        // Redirect to home after successful registration
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please try again.");
    }
  };

  const displayError = authError || localError;

  return (
    <div
      className="login d-flex flex-column align-items-center justify-content-center p-3"
      style={{ height: "90.7vh" }}
    >
      <div className="d-flex flex-column align-items-center mb-3">
        <FaUserPlus className="text-theme" fontSize="1.5rem" />
        <h2 className="fw-bold text-theme">Create Your Account</h2>
      </div>

      {/* Error Alert */}
      {displayError && (
        <div className="alert alert-danger" role="alert">
          {displayError}
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}



      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`bg-${theme === "dark" ? "secondary" : "light"} text-${theme === "dark" ? "light" : "dark"} rounded shadow-lg p-4 row g-3`}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        {/* Name */}
        <div className="col-12">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your full name"
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        {/* Email */}
        <div className="col-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Password */}
        <div className="col-12">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        {/* Confirm Password */}
        <div className="col-12">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>

        {/* Submit Button */}
        <div className="col-12 d-flex justify-content-center">
          <button 
            type="submit" 
            className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={authLoading}
          >
            {authLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <FaUserPlus />
              </>
            )}
          </button>
        </div>

        {/* Link to Login */}
        <div className="col-12 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary text-decoration-none">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
