import { Company, WorkExperience } from "@prisma/client";

export type TWorkExperience = WorkExperience & {
    company: Company
}