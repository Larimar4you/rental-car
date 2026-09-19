"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";

import { createBookingRequest } from "@/lib/api";
import styles from "./RentalForm.module.css";

interface RentalFormProps {
  carId: string;
}

type FormValues = {
  name: string;
  email: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  comment: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name";
  } else if (!/^[\p{L}\s'-]+$/u.test(values.name.trim())) {
    errors.name = "Please enter a valid name";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email";
  }

  if (!values.comment.trim()) {
    errors.comment = "Comment is required";
  }

  return errors;
}

export default function RentalForm({ carId }: RentalFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await createBookingRequest(carId, {
        name: values.name.trim(),
        email: values.email.trim(),
        comment: values.comment.trim(),
      });

      toast.success(response.message);
      setValues(initialValues);
      setErrors({});
    } catch {
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.formSection}>
      <h2 className={styles.title}>Book your car now</h2>

      <p className={styles.description}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            {(values.name || errors.name) && (
              <label htmlFor="booking-name" className={styles.floatingLabel}>
                Name*
              </label>
            )}

            <input
              id="booking-name"
              className={`${styles.input} ${
                values.name || errors.name ? styles.withLabel : ""
              } ${errors.name ? styles.invalid : ""}`}
              type="text"
              name="name"
              placeholder={values.name || errors.name ? "" : "Name*"}
              aria-label="Name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
            />

            {errors.name && (
              <span className={styles.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>

          {errors.name && (
            <p id="name-error" className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            {(values.email || errors.email) && (
              <label htmlFor="booking-email" className={styles.floatingLabel}>
                Email*
              </label>
            )}

            <input
              id="booking-email"
              className={`${styles.input} ${
                values.email || errors.email ? styles.withLabel : ""
              } ${errors.email ? styles.invalid : ""}`}
              type="email"
              name="email"
              placeholder={values.email || errors.email ? "" : "Email*"}
              aria-label="Email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
            />

            {errors.email && (
              <span className={styles.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>

          {errors.email && (
            <p id="email-error" className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            <label htmlFor="booking-comment" className={styles.textareaLabel}>
              Comment
            </label>

            <textarea
              id="booking-comment"
              className={`${styles.textarea} ${
                errors.comment ? styles.invalid : ""
              }`}
              name="comment"
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={errors.comment ? "comment-error" : undefined}
              value={values.comment}
              onChange={(event) => updateField("comment", event.target.value)}
            />

            {errors.comment && (
              <span className={styles.errorIcon} aria-hidden="true">
                !
              </span>
            )}
          </div>

          {errors.comment && (
            <p id="comment-error" className={styles.error}>
              {errors.comment}
            </p>
          )}
        </div>

        {/* Submit */}
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
