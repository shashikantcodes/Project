import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6"; // ✅ fixed import

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

function Login() {
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
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div
      className="login d-flex flex-column align-items-center justify-content-center bg-dark text-light"
      style={{ height: "90.5vh" }}
    >
      <div className="text-center mb-3">
        <FaArrowRotateRight size={32} />
        <h2 className="fw-bold mt-2">Login to Your Account</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-light text-dark shadow p-4 rounded"
        style={{ width: "100%", maxWidth: "26rem" }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            autoComplete="off"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">
            Password:
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            autoComplete="off"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="d-grid mb-3">
          <button
            type="submit"
            className="btn btn-theme d-flex align-items-center justify-content-center gap-2"
          >
            <span>Login</span>
            <IoMdLogIn />
          </button>
        </div>

        <div className="d-flex justify-content-between">
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
