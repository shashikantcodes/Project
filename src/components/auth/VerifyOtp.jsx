// OTPVerify.jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { IoMdArrowBack, IoMdCheckmarkCircle } from "react-icons/io";

const schema = Joi.object({
  otp: Joi.string().length(6).required().messages({
    "string.empty": "OTP is required!",
    "string.length": "OTP must be 6 digits!",
  }),
});

function OTPVerify() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema), mode: "onTouched" });

  const onSubmit = (data) => {
    console.log("OTP Verified:", data);
    navigate("/password/update");
  };

  return (
    <div className="login d-flex flex-column align-items-center justify-content-center p-3" style={{ height: "90.7vh" }}>
      <div className="d-flex flex-column align-items-center mb-3">
        <IoMdCheckmarkCircle className="text-theme" fontSize="1.5rem" />
        <h2 className="fw-bold text-theme">Verify OTP</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="d-flex justify-content-center gap-2 row shadow-lg p-3 bg-body-tertiary rounded" style={{ width: "26rem" }}>
        <div>
          <label htmlFor="otp" className="form-label">OTP:</label>
          <input
            {...register("otp")}
            type="text"
            id="otp"
            className={`form-control ${errors.otp ? "is-invalid" : ""}`}
            placeholder="Enter 6-digit OTP"
            autoComplete="off"
          />
          {errors.otp && <div className="invalid-feedback ms-1">{errors.otp.message}</div>}
        </div>

        <div className="w-100 d-flex justify-content-center mb-2">
          <button type="submit" className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2">
            <span>Verify</span>
            <IoMdCheckmarkCircle />
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

export default OTPVerify;
