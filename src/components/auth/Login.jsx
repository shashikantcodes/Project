import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";

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
    console.log("Form Data Submitted:", data);
    navigate("/signup");
  };

  return (
    <div
      className="login d-flex flex-column align-items-center justify-content-center p-3"
      style={{ height: "90.7vh" }}
    >
     
      {/* Header */}
      <div className="text-center mb-3">
        <FaUserPlus fontSize="1.5rem" />
        <h2 className="fw-bold text-theme">Login Account</h2>
      </div>
     


      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`bg-${theme === "dark" ? "secondary" : "light"} text-${theme === "dark" ? "light" : "dark"} rounded shadow-lg p-4 row g-3`}
        style={{ width: "100%", maxWidth: "420px" }}
      >

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


        {/* Submit Button */}
        <div className="col-12 d-flex justify-content-center">
          <button type="submit" className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2">
            <span>Login</span>
            <FaUserPlus />
          </button>
        </div>

        {/* Links */}
        <div className="d-flex justify-content-between small">
          <Link to="/forgot/password" className="text-decoration-none text-primary">             Forgot Password?
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
