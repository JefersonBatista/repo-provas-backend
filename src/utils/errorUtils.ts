export type AppErrorType =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "unprocessable_entity";

interface AppError {
  type: AppErrorType;
  message: string;
}

export function emailAlreadyUsedError(): AppError {
  return {
    type: "conflict",
    message: "Já há um usuário com esse email",
  };
}

export function incorrectPasswordError(): AppError {
  return {
    type: "unauthorized",
    message: "Senha incorreta",
  };
}

export function emailNotUsedError(): AppError {
  return {
    type: "not_found",
    message: "Nenhum usuário cadastrado com esse email",
  };
}

export function invalidAuthTokenError(): AppError {
  return {
    type: "unauthorized",
    message: "Token de autenticação inválido",
  };
}

export function testNotFoundError(): AppError {
  return {
    type: "not_found",
    message: "Não há prova com o ID especificado",
  };
}
