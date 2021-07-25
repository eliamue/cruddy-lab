DROP TABLE IF EXISTS rappers;
DROP TABLE IF EXISTS vocalists;
DROP TABLE IF EXISTS dancers;
DROP TABLE IF EXISTS visuals;
DROP TABLE IF EXISTS leaders;
DROP TABLE IF EXISTS maknaes;

CREATE TABLE rappers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);

CREATE TABLE vocalists (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);

CREATE TABLE dancers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);

CREATE TABLE visuals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);

CREATE TABLE leaders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);

CREATE TABLE maknaes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kgroup TEXT NOT NULL,
    stage_name TEXT NOT NULL,
    real_name TEXT NOT NULL
);