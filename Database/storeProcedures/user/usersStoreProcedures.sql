
-- insert user

CREATE OR ALTER PROCEDURE insertUser(@id VARCHAR(255) , @username VARCHAR(255), 
@email VARCHAR(255) ,@password VARCHAR(255)
)

AS
BEGIN 


INSERT INTO Users(id,username,email,password)
VALUES( @id, @username,@email, @password)

END


-- get user by email

CREATE OR ALTER PROCEDURE getUserByEmail(@email VARCHAR(255))
AS
BEGIN
SELECT * FROM Users WHERE  email=@email AND isDeleted=0
END


-- get user by id

CREATE OR ALTER PROCEDURE getUserById(@id VARCHAR(255))
AS
BEGIN
SELECT * FROM Users WHERE  id=@id AND isDeleted=0
END


-- get all users

CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
SELECT * FROM Users WHERE isDeleted=0
END



-- delete user

CREATE OR ALTER PROCEDURE deleteUser(@id VARCHAR(255))
AS
BEGIN

UPDATE Users SET isDeleted=1 WHERE id=@id AND isDeleted =0

END

-- update user

create or alter procedure updateUser (@id VARCHAR(255), @username VARCHAR(255), @title VARCHAR(255),
@email VARCHAR(255), @about varchar(255))

AS
BEGIN 

update Users
set username= @username, title= @title, email=@email,about=@about
where id=@id
END