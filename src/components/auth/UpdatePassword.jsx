import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff, IoMdArrowBack } from 'react-icons/io';
import { GrUpdate } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const schema = Joi.object({
    newPassword: Joi.string().min(6).required().messages({
      'string.empty': 'New Password is required!',
      'string.min': 'Password must be at least 6 characters.',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Password Updated:', data);
    navigate('/login');
  };

  return (
    <div
      className="login d-flex flex-column align-items-center justify-content-center theme-bg py-5"
      style={{ minHeight: '90vh' }}
    >
      <div className="text-center mb-4">
        <GrUpdate size={40} className="text-theme mb-2" />
        <h3 className="fw-bold text-dark">Update Your Password</h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white shadow-lg p-4 rounded w-100"
        style={{ maxWidth: '420px' }}
      >
        {/* New Password Label and Input */}
        <div className="mb-3 position-relative">
          <label
            htmlFor="newPassword"
            className="form-label fw-bold text-theme"
            style={{ fontSize: '1rem', fontWeight: '600' }}
          >
            New Password
          </label>
          <input
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            autoComplete="off"
            className={`form-control ${isSubmitted && errors.newPassword ? 'is-invalid' : ''}`}
            {...register('newPassword')}
          />
          {!errors.newPassword && (
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: 'pointer' }}
            >
              {showNewPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </span>
          )}
          {errors.newPassword && (
            <div className="invalid-feedback">{errors.newPassword.message}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-theme w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
        >
          <GrUpdate />
          <span>Update Password</span>
        </button>

        {/* Back to Login Button */}
        <Link
          to="/login"
          className="btn btn-outline-theme w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
        >
          <IoMdArrowBack />
          <span>Back to Login</span>
        </Link>
      </form>
    </div>
  );
}

export default UpdatePassword;
