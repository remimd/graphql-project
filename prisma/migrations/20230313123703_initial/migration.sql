-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor" (
    "id" SERIAL NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_students" (
    "group_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "group_students_pkey" PRIMARY KEY ("group_id","student_id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "group_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "instructor_id" INTEGER NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "maximum" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_grades" (
    "value" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "grade_id" INTEGER NOT NULL,
    "instructor_id" INTEGER NOT NULL,

    CONSTRAINT "student_grades_pkey" PRIMARY KEY ("student_id","grade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "group_name_start_year_end_year_course_id_key" ON "group"("name", "start_year", "end_year", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_number_key" ON "room"("number");

-- CreateIndex
CREATE UNIQUE INDEX "class_start_end_room_id_key" ON "class"("start", "end", "room_id");

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_students" ADD CONSTRAINT "group_students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_students" ADD CONSTRAINT "group_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade" ADD CONSTRAINT "grade_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_grades" ADD CONSTRAINT "student_grades_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_grades" ADD CONSTRAINT "student_grades_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_grades" ADD CONSTRAINT "student_grades_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
