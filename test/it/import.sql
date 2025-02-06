-- 데이터베이스가 없으면 생성
CREATE DATABASE IF NOT EXISTS dbname;
USE dbname;

-- User 테이블 생성
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Point 테이블 생성
CREATE TABLE IF NOT EXISTS point (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    amount INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Queue 테이블 생성
CREATE TABLE IF NOT EXISTS queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

-- 60명의 User 및 Point 데이터 삽입
INSERT INTO user (name, email) VALUES 
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('David Wilson', 'david@example.com'),
('Emma Davis', 'emma@example.com'),
('Frank Moore', 'frank@example.com'),
('Grace Taylor', 'grace@example.com'),
('Henry Anderson', 'henry@example.com'),
('Ivy Thomas', 'ivy@example.com'),
('Jack White', 'jack@example.com'),
('Karen Harris', 'karen@example.com'),
('Leo Martin', 'leo@example.com'),
('Mia Clark', 'mia@example.com'),
('Nathan Lewis', 'nathan@example.com'),
('Olivia Walker', 'olivia@example.com'),
('Peter Hall', 'peter@example.com'),
('Quinn Allen', 'quinn@example.com'),
('Rachel Young', 'rachel@example.com'),
('Samuel King', 'samuel@example.com'),
('Tina Wright', 'tina@example.com'),
('Ulysses Scott', 'ulysses@example.com'),
('Victoria Green', 'victoria@example.com'),
('William Adams', 'william@example.com'),
('Xander Nelson', 'xander@example.com'),
('Yvonne Carter', 'yvonne@example.com'),
('Zachary Baker', 'zachary@example.com'),
('Alice Brown', 'alice.brown@example.com'),
('Bob Taylor', 'bob.taylor@example.com'),
('Charlie Moore', 'charlie.moore@example.com'),
('Daniel Johnson', 'daniel.johnson@example.com'),
('Eve Davis', 'eve.davis@example.com'),
('Finn Wilson', 'finn.wilson@example.com'),
('Grace Lee', 'grace.lee@example.com'),
('Hank Harris', 'hank.harris@example.com'),
('Isla Thomas', 'isla.thomas@example.com'),
('Jackie White', 'jackie.white@example.com'),
('Kevin Martin', 'kevin.martin@example.com'),
('Laura Clark', 'laura.clark@example.com'),
('Mike Lewis', 'mike.lewis@example.com'),
('Nina Walker', 'nina.walker@example.com'),
('Oscar Hall', 'oscar.hall@example.com'),
('Paula Allen', 'paula.allen@example.com'),
('Quincy Young', 'quincy.young@example.com'),
('Rita King', 'rita.king@example.com'),
('Steve Wright', 'steve.wright@example.com'),
('Tiffany Scott', 'tiffany.scott@example.com'),
('Umar Green', 'umar.green@example.com'),
('Vivian Adams', 'vivian.adams@example.com'),
('Walter Nelson', 'walter.nelson@example.com'),
('Xenia Carter', 'xenia.carter@example.com'),
('Yusuf Baker', 'yusuf.baker@example.com'),
('Zoe Brown', 'zoe.brown@example.com'),
('Adam Clark', 'adam.clark@example.com'),
('Bella Lee', 'bella.lee@example.com'),
('Cody Harris', 'cody.harris@example.com'),
('Diana Thomas', 'diana.thomas@example.com');

-- Point 데이터 삽입
INSERT INTO point (user_id, amount) 
SELECT id, FLOOR(RAND() * 10000) + 100 FROM user;
