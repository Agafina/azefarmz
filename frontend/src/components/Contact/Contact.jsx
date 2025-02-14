import React from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import { contactInfo } from "../../assets/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import FloatingInput from "../input/Input";

// Create Zod schema for form validation
const createContactSchema = (t) => {
  return z.object({
    name: z.string()
      .min(2, t("contactvalidation.nameTooShort"))
      .max(50, t("contactvalidation.nameTooLong")),
    email: z.string()
      .email(t("contactvalidation.invalidEmail")),
    subject: z.string()
      .min(3, t("contactvalidation.subjectTooShort"))
      .max(100, t("contactvalidation.subjectTooLong")),
    message: z.string()
      .min(10, t("contactvalidation.messageTooShort"))
      .max(1000, t("contactvalidation.messageTooLong")),
  });
};

const ContactPage = () => {
  const { t } = useTranslation();
  const contactSchema = createContactSchema(t);
  
  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  });

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // This would be replaced with your actual API call
      console.log('Form data submitted:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success(t("contact.form.successMessage"));
      
      // Reset the form
      reset();
    } catch (error) {
      toast.error(t("contact.form.errorMessage"));
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <h1>{t(contactInfo.header.title)}</h1>
      <p>{t(contactInfo.header.description)}</p>

      {/* Contact Information */}
      <div className="contact-info">
        <div className="contact-details">
          <h2>{t("contact.phone.label")}</h2>
          <p>{t(contactInfo.phone)}</p>
          <h2>{t("contact.email.label")}</h2>
          <p>
            <a href={`mailto:${t(contactInfo.email)}`}>
              {t(contactInfo.email)}
            </a>
          </p>
          <h2>{t("contact.address.label")}</h2>
          <p>{t(contactInfo.address)}</p>
        </div>
        <div className="social-links">
          <h2>{t("contact.followUs")}</h2>
          {contactInfo.socialLinks.map((link, index) => (
            <a key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>{t("contact.form.title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FloatingInput
            name="name"
            label={t("contact.form.name")}
            required
            error={errors.name?.message}
            {...register("name")}
          />
          
          <FloatingInput
            name="email"
            type="email"
            label={t("contact.form.email")}
            required
            error={errors.email?.message}
            {...register("email")}
          />
          
          <FloatingInput
            name="subject"
            label={t("contact.form.subject")}
            required
            error={errors.subject?.message}
            {...register("subject")}
          />
          
          <FloatingInput
            name="message"
            type="textarea"
            label={t("contact.form.message")}
            required
            error={errors.message?.message}
            {...register("message")}
          />
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <><span className="spinner"></span> {t("contact.form.sending")}</>
            ) : (
              t("contact.form.submit")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;