import jwt from "jsonwebtoken";
import { Request, RequestHandler, Response } from "express";
import { userRegistrationSchema } from "../Helpers/userValidation";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";
import { ExtendedRequest, User } from "../Interfaces";
import { DatabaseHelper } from "../DatabaseHelper";

// add users

export const addUser = async (req: ExtendedRequest, res: Response) => {
  try {
    let id = uid();
    const { username, email, password } = req.body;
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(404).json(error);
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    await DatabaseHelper.exec("insertUser", {
      id,
      username,
      email,
      password: hashedPassword,
    });
    const payload = {
      user: {
        id,
        username,
        email,
      },
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
      expiresIn: "360000s",
    });

    return res.json({ message: "User registered successfull", token });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// get all users

export const getallUsers = async (req: Request, res: Response) => {
  try {
    let users: User[] = (await DatabaseHelper.exec("getUsers")).recordset;
    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// getting users by id

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    let user: User = await (
      await DatabaseHelper.exec("getUserById", { id: id })
    ).recordset[0];

    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: "User Not Found" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// getting user by email

export const getUserByEmail: RequestHandler<{ email: string }> = async (
  req,
  res
) => {
  try {
    const { email } = req.params;

    let user: User[] = (await DatabaseHelper.exec("getUserByEmail", { email }))
      .recordset;
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// update user

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { username, email, title, about } = req.body;
    const { id } = req.params;
    let user: User = await (
      await DatabaseHelper.exec("getUserById", { id })
    ).recordset[0];

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await DatabaseHelper.exec("updateUser", {
      id,
      username,
      email,
      about,
      title,
    });
    return res.status(200).json({ message: "User Updated" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// delete user

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;

    let user: User = (await await DatabaseHelper.exec("getUserById", { id }))
      .recordset[0];

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await DatabaseHelper.exec("deleteUser", { id });
    return res.status(200).json({ message: "User Deleted" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// login

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user: User[] = (
      await await DatabaseHelper.exec("getUserByEmail", { email })
    ).recordset;
    if (!user[0]) {
      return res.status(404).json({ message: "User not found" });
    }

    let valiUser = await bcrypt.compare(password, user[0].password);
    if (!valiUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = user.map((user1) => {
      const { password, isDeleted, ...rest } = user1;
      return rest;
    });

    const token = jwt.sign(payload[0], process.env.SECRET_KEY as string, {
      expiresIn: "360000s",
    });
    const role = user[0].role;
    const id = user[0].id;
    return res.json({ message: "Log in successfull", token, role, id });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
