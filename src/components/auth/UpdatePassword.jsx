// PasswordUpdate.jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { IoMdArrowBack, IoMdKey } from "react-icons/io";

const schema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required!",
    "string.min": "Password must be at least 6 characters!",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match!",
    "any.required": "Please confirm your password!",
  }),
});

function PasswordUpdate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema), mode: "onTouched" });

  const onSubmit = (data) => {
    console.log("Password Updated:", data);
    navigate("/login");
  };

  return (
    <div className="login d-flex flex-column align-items-center justify-content-center p-3" style={{ height: "90.7vh" }}>
      <div className="d-flex flex-column align-items-center mb-3">
        <IoMdKey className="text-theme" fontSize="1.5rem" />
        <h2 className="fw-bold text-theme">Reset Your Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="d-flex justify-content-center gap-2 row shadow-lg p-3 bg-body-tertiary rounded" style={{ width: "26rem" }}>
        <div>
          <label htmlFor="password" className="form-label">New Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter new password"
          />
          {errors.password && <div className="invalid-feedback ms-1">{errors.password.message}</div>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            placeholder="Re-enter new password"
          />
          {errors.confirmPassword && <div className="invalid-feedback ms-1">{errors.confirmPassword.message}</div>}
        </div>

        <div className="w-100 d-flex justify-content-center mb-2">
          <button type="submit" className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2">
            <span>Update Password</span>
            <IoMdKey />
          </button>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button type="button" className="btn btn-outline-theme w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => navigate("/login")}>
            <IoMdArrowBack />
            <span>Back to Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordUpdate;
