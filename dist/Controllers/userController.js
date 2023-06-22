"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getallUsers = exports.addUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userValidation_1 = require("../Helpers/userValidation");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const DatabaseHelper_1 = require("../DatabaseHelper");
// add users
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const { error } = userValidation_1.userRegistrationSchema.validate(req.body);
        if (error) {
            return res.status(404).json(error);
        }
        let hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield DatabaseHelper_1.DatabaseHelper.exec("insertUser", {
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
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "360000s",
        });
        return res
            .status(201)
            .json({ message: "User registered successfull", token });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.addUser = addUser;
// get all users
const getallUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = (yield DatabaseHelper_1.DatabaseHelper.exec("getUsers")).recordset;
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getallUsers = getallUsers;
// getting users by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let user = yield (yield DatabaseHelper_1.DatabaseHelper.exec("getUserById", { id: id })).recordset[0];
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: "User Not Found" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getUserById = getUserById;
// getting user by email
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        let user = (yield DatabaseHelper_1.DatabaseHelper.exec("getUserByEmail", { email }))
            .recordset;
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getUserByEmail = getUserByEmail;
// update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, title, about } = req.body;
        const { id } = req.params;
        let user = yield (yield DatabaseHelper_1.DatabaseHelper.exec("getUserById", { id })).recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        yield DatabaseHelper_1.DatabaseHelper.exec("updateUser", {
            id,
            username,
            email,
            about,
            title,
        });
        return res.status(200).json({ message: "User Updated" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateUser = updateUser;
// delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const role = (_a = req.info) === null || _a === void 0 ? void 0 : _a.role;
        if (role != "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let user = (yield yield DatabaseHelper_1.DatabaseHelper.exec("getUserById", { id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        yield DatabaseHelper_1.DatabaseHelper.exec("deleteUser", { id });
        return res.status(200).json({ message: "User Deleted" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteUser = deleteUser;
// login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = (yield yield DatabaseHelper_1.DatabaseHelper.exec("getUserByEmail", { email })).recordset;
        if (!user[0]) {
            return res.status(404).json({ message: "User not found" });
        }
        let valiUser = yield bcrypt_1.default.compare(password, user[0].password);
        if (!valiUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const payload = user.map((user1) => {
            const { password, isDeleted } = user1, rest = __rest(user1, ["password", "isDeleted"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, {
            expiresIn: "360000s",
        });
        const role = user[0].role;
        const id = user[0].id;
        return res
            .status(200)
            .json({ message: "Log in successfull", token, role, id });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
