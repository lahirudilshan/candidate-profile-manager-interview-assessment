import { AxiosResponse } from 'axios';
import { Candidate } from "@prisma/client";
import { TCandidate } from "@modules/profiles/types/entity";
import { TCommonResponse } from '@shared/types/service';

export type TProfileCreatePayload = Candidate;

export type TProfileCreateResponse = {
    success: boolean,
    data?: Candidate | null | any;
    message?: string
}

// fetch
export type TFetchProfileResponse = AxiosResponse<TCommonResponse<TCandidate>>;