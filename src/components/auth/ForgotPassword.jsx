import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack, IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { FaArrowRotateRight } from "react-icons/fa6";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required!",
      "string.email": "Must be a valid email!",
    }),
});

function ForgotPassword() {
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
    console.log("Form Data:", data);
    navigate("/otp/verify");
  };

  return (
    <div
      className="login d-flex flex-column align-items-center justify-content-center p-3"
      style={{ height: "90.7vh" }}
    >
      <div className="d-flex flex-column align-items-center mb-3">
        <FaArrowRotateRight className="text-theme" fontSize="1.5rem" />
        <h2 className="fw-bold text-theme">Find Your Account</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="d-flex justify-content-center needs-validation gap-2 row cols shadow-lg p-3 bg-body-tertiary rounded"
        style={{ width: "26rem" }}
      >
        <div>
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your registered email"
            autoComplete="off"
          />
          {errors.email && (
            <div className="invalid-feedback ms-1">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="w-100 d-flex justify-content-center mb-2">
          <button
            type="submit"
            className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <span>Send OTP</span>
            <IoMdSend />
          </button>
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-theme w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate("/login")}
          >
            <IoMdArrowBack />
            <span>Back to Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
