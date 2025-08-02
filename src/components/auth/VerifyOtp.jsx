import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineVerified } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdSend } from "react-icons/io";

function VerifyOtp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm();

  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef([]);

  const onSubmit = (data) => {
    console.log("OTP:", Object.values(data).join(""));
    navigate("/password/update");
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setValue(`otp${index + 1}`, val);
    trigger(`otp${index + 1}`);
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className="login d-flex flex-column align-items-center justify-content-center p-3 bg-theme" style={{ height: "90.7vh" }}>
      <div className="d-flex flex-column align-items-center mb-3 text-light">
        <MdOutlineVerified fontSize="1.8rem" />
        <h2 className="fw-bold">Verify OTP</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-4 shadow-sm" style={{ width: "26rem" }}>
        <p className="mb-3 text-center">Enter the 6-digit OTP sent to your registered email.</p>

        <div className="row justify-content-center mb-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="col-2 p-1">
              <input
                maxLength="1"
                {...register(`otp${i + 1}`, { required: true, pattern: /^[0-9]$/ })}
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                className={`form-control text-center fw-bold fs-5 py-2 ${errors[`otp${i + 1}`] ? "border-danger" : "border-success"}`}
                autoFocus={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="text-center mb-3">
          <button
            type="submit"
            className="btn btn-theme w-100 d-flex align-items-center justify-content-center gap-2"
            disabled={Object.values(watch()).some(val => !val)}
          >
            <span>Verify</span>
            <MdOutlineVerified />
          </button>
        </div>

        <div className="w-100 d-flex justify-content-center mb-3">
          <Link
            to="/login"
            className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <IoMdArrowBack />
            <span>Back to Login</span>
          </Link>
        </div>

        <div className="text-center">
          {timeLeft === 0 ? (
            <button className="btn btn-outline-theme d-flex align-items-center justify-content-center gap-2">
              <span>Resend</span>
              <IoMdSend />
            </button>
          ) : (
            <span className="text-muted">Resend OTP in {formatTime(timeLeft)}</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;
