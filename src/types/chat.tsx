import { type CoreMessage } from "ai";

export type Message = CoreMessage & {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface User extends Record<string, any> {
  id: string;
  email: string;
  password: string;
  salt: string;
}
