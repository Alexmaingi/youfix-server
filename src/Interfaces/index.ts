import { Request } from "express";

export interface DecodedData {
  id: string;
  username: string;
  email: string;
  role: string;
}
export interface ExtendedRequest extends Request {
  info?: DecodedData;
  params: {
    id: string;
    email: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  about: string;
  role: string;
  title: string;
  isDeleted: number;
}
export interface Tag {
  id: string;
  tagname: string;
}

export interface Questions {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export interface Answer {
  id: string;
  userId: string;
  questionId: string;
  body: string;
  isAccepted: string;
}

export interface Comment {
  id: string;
  userId: string;
  answerId: string;
  body: string;
}
