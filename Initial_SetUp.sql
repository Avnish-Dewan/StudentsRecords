create database if not exists student_records;
use student_records;
create table if not exists login(username varchar(250),password varchar(250),role varchar(20));
create table if not exists student_data(
	rollNumber int auto_increment primary key, 
    fname varchar(50),
    midname varchar(50),
    lname varchar(50),
    age int,
    dob date,
    email varchar(100),
    address varchar(100)
);
create table subject_details(subcode integer, subname varchar(100));
insert into login values('admin','admin');
insert into subject_details values("1","Engineering Mathematics");
-- select * from subject_details;
-- select * from student_data;
-- desc subject_details;
ALTER TABLE subject_details MODIFY subcode varchar(100);  
alter table subject_details ADD primary key(subcode);
alter table student_data add column subjects JSON;
-- desc student_data;
-- select * from student_data;

alter table student_data add column dues JSON;
-- alter table student_data drop column dues;
-- drop table dues;
create table dues ( due_id varchar(256), stud_id integer, due_desc varchar(50) , due_payment real, CONSTRAINT fk_dues FOREIGN key (stud_id) REFERENCES student_data(rollNumber) ); 
alter table dues add column is_completed boolean;
-- select * from dues;
alter table dues add primary key (due_id);


create table marks ( stud_id integer, subcode varchar(100), marks integer, CONSTRAINT fk_marks_stud FOREIGN key (stud_id) REFERENCES student_data(rollNumber), CONSTRAINT fk_marks_sub FOREIGN key (subcode) REFERENCES subject_details(subcode));
-- desc dues;
alter table marks add primary key (stud_id,subcode);

-- desc marks;
-- select * from marks;