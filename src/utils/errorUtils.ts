interface AppError {
  type:
    | "unauthorized"
    | "forbidden"
    | "not_found"
    | "conflict"
    | "unprocessable_entity";
  message: string;
}

export function emailAlreadyUsedError(): AppError {
  return {
    type: "conflict",
    message: "Já há um usuário com esse email",
  };
}
