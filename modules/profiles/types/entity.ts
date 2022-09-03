import { Candidate } from "@prisma/client";
import { TWorkExperience } from "@modules/profiles/types/work-experience/entity";

export type TCandidate = Candidate & {
    workExperiences: TWorkExperience[]
};