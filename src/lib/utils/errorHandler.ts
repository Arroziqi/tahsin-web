// errorHandler.ts
import { AxiosError } from 'axios';

type ErrorResponse = {
  status: number;
  message: string;
  details?: any;
  validationErrors?: Record<string, string>;
  errorCode?: string;
};

export function handleApiError(error: unknown): ErrorResponse {
  // Handle AxiosError
  if (isAxiosError(error)) {
    console.log('error axios');
    return handleAxiosError(error);
  }

  // Handle Prisma Error
  if (isPrismaError(error)) {
    return handlePrismaError(error);
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message || 'Unknown error occurred',
    };
  }

  return {
    status: 500,
    message: 'Unknown error occurred',
  };
}

// Type guards
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function isPrismaError(error: unknown): error is { code: string; meta?: any } {
  const e = error as any;
  return e && typeof e.code === 'string' && e.code.startsWith('P');
}

// Error handlers
function handleAxiosError(error: AxiosError): ErrorResponse {
  // Network error (no response)
  if (!error.response) {
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
    };
  }

  const { status, data } = error.response;
  const responseData = data as any;

  if (responseData.errors && responseData.errors.name === 'PrismaClientKnownRequestError') {
    return handlePrismaError(responseData.errors);
  }

  // Common error patterns
  switch (status) {
    case 400:
      return {
        status,
        message: responseData?.message || 'Bad request',
        validationErrors: responseData?.errors,
        details: responseData,
      };
    case 401:
      return {
        status,
        message: responseData?.message || 'Unauthorized access',
      };
    case 403:
      return {
        status,
        message: responseData?.message || 'Forbidden',
      };
    case 404:
      return {
        status,
        message: responseData?.message || 'Resource not found',
      };
    case 409:
      return {
        status,
        message: responseData?.message || 'Conflict occurred',
        details: responseData,
      };
    case 422:
      return {
        status,
        message: 'Validation failed',
        validationErrors: responseData?.errors,
        details: responseData,
      };
    case 500:
      return {
        status,
        message: responseData?.message || 'Internal server error',
        details: responseData,
      };
    default:
      return {
        status,
        message: responseData?.message || `HTTP Error ${status}`,
        details: responseData,
      };
  }
}

function handlePrismaError(error: { code: string; meta?: any }): ErrorResponse {
  switch (error.code) {
    case 'P2002':
      return {
        status: 409,
        message: 'Duplicate entry',
        details: error.meta,
        errorCode: error.code,
      };
    case 'P2025':
      return {
        status: 404,
        message: 'Record not found',
        details: error.meta,
        errorCode: error.code,
      };
    case 'P2003':
      return {
        status: 400,
        message: 'Foreign key constraint failed',
        details: error.meta,
        errorCode: error.code,
      };
    default:
      return {
        status: 500,
        message: 'Database error occurred',
        details: error,
        errorCode: error.code,
      };
  }
}

// Utility function to get user-friendly error message
export function getErrorMessage(error: ErrorResponse): string {
  let message = error.message;

  if (error.validationErrors) {
    const validationMessages = Object.values(error.validationErrors).join(', ');
    message += ` (${validationMessages})`;
  }

  return message;
}
