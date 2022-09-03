import { WorkExperience } from "@prisma/client";
import { AxiosResponse } from "axios";
import { TCandidate } from "@modules/profiles/types/entity";

// common
export type TCommonResponse<T> = {
    success: boolean,
    data: T;
    message?: string
}

// create
export type TWorkExperienceCreatePayload = WorkExperience;
export type TWorkExperienceCreateResponse = AxiosResponse<TCommonResponse<WorkExperience>>

// fetch
export type TFetchProfileResponse = AxiosResponse<TCommonResponse<TCandidate>>;