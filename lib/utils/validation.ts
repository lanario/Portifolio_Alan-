/**
 * Funções de validação para formulários
 */

/**
 * Valida se o email está em formato válido
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se o campo não está vazio
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida se o valor tem comprimento mínimo
 */
export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Valida se o valor tem comprimento máximo
 */
export function validateMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

/**
 * Mensagens de erro padrão
 */
export const errorMessages = {
  required: 'Este campo é obrigatório',
  email: 'Email inválido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
};
