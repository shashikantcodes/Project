import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";

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

function SignUp() {
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
    navigate("/login");
  };

  return (
    <div
      className="signup d-flex flex-column align-items-center justify-content-center p-3 bg-dark text-light"
      style={{ height: "90.7vh" }}
    >
      <div className="d-flex flex-column align-items-center">
        <FaUserPlus color="white" fontSize="1.5rem" />
        <h2 className="fw-bold text-light">Create Your Account</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="d-flex justify-content-center bg-light text-dark needs-validation gap-2 row cols shadow-lg p-3 rounded mb-5"
        style={{ width: "26rem" }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your full name"
            autoComplete="off"
          />
          {errors.name && (
            <div className="invalid-feedback ms-1">
              {errors.name.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            autoComplete="off"
          />
          {errors.email && (
            <div className="invalid-feedback ms-1">
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            autoComplete="off"
          />
          {errors.password && (
            <div className="invalid-feedback ms-1">
              {errors.password.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
              }`}
            placeholder="Re-enter your password"
            autoComplete="off"
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback ms-1">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="w-100 d-flex justify-content-center mb-2">
          <button
            type="submit"
            className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <span>SignUp</span>
            <FaUserPlus />
          </button>

        </div>

        <div className="w-100 d-flex justify-content-center">
          <span className="me-2">Already have an account?</span>
          <Link to="/login" className="text-decoration-none text-primary">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
