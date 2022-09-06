import { WorkExperience } from "@prisma/client";
import { AxiosResponse } from "axios";
import { TWorkExperience } from "@modules/profiles/types/work-experience/entity";
import { TCommonResponse } from "@shared/types/service";

// create
export type TWorkExperienceCreatePayload = WorkExperience;
export type TWorkExperienceCreateResponse = AxiosResponse<TCommonResponse<WorkExperience>>

// fetch
export type TFetchWorkExperienceResponse = AxiosResponse<TCommonResponse<TWorkExperience[]>>