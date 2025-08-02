import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6";

// Validation Schema
const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required!",
    "string.email": "Must be a valid email!",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required!",
    "string.min": "Password must be at least 6 characters!",
  }),
});

function Login({ theme }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    navigate("/dashboard");
  };

  return (
    <div
      className={`login d-flex flex-column align-items-center justify-content-center ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ height: "90.5vh" }}
    >
      <div className="text-center mb-4">
        <FaArrowRotateRight size={32} />
        <h2 className="fw-bold mt-2">Login to Your Account</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`shadow p-4 rounded w-100 ${
          theme === "dark" ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
        style={{ maxWidth: "26rem" }}
      >
        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email:</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            autoComplete="off"
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            autoComplete="off"
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-3">
          <button
            type="submit"
            className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${
              theme === "dark" ? "btn-light text-dark" : "btn-dark text-light"
            }`}
          >
            <span>Login</span>
            <IoMdLogIn />
          </button>
        </div>

        {/* Links */}
        <div className="d-flex justify-content-between small">
          <Link to="/forgot/password" className="text-decoration-none text-primary">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-decoration-none text-primary">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
