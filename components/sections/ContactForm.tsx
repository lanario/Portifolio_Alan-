'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  validateEmail,
  validateRequired,
  validateMinLength,
  errorMessages,
} from '@/lib/utils/validation';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleChange(
    field: keyof FormData,
    value: string
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = errorMessages.required;
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = errorMessages.required;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = errorMessages.email;
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = errorMessages.required;
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = errorMessages.required;
    } else if (!validateMinLength(formData.message, 10)) {
      newErrors.message = errorMessages.minLength(10);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Integrar com serviço de email (EmailJS, Resend, etc.)
      // Por enquanto, apenas simula o envio
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Resetar status após 3 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Nome"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
          placeholder="Seu nome completo"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
          placeholder="seu@email.com"
        />
      </div>

      <Input
        label="Assunto"
        type="text"
        value={formData.subject}
        onChange={(e) => handleChange('subject', e.target.value)}
        error={errors.subject}
        required
        placeholder="Assunto da mensagem"
      />

      <Textarea
        label="Mensagem"
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
        required
        placeholder="Sua mensagem aqui..."
        rows={6}
      />

      {/* Status de Envio */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
        >
          <FiCheckCircle className="w-5 h-5" />
          <span>Mensagem enviada com sucesso! Entrarei em contato em breve.</span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
        >
          <FiAlertCircle className="w-5 h-5" />
          <span>Erro ao enviar mensagem. Tente novamente mais tarde.</span>
        </motion.div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Enviando...
          </>
        ) : (
          <>
            <FiSend className="w-4 h-4 mr-2" />
            Enviar Mensagem
          </>
        )}
      </Button>
    </motion.form>
  );
}

export { ContactForm };
