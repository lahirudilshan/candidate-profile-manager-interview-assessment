import { TCandidate } from '@modules/profiles/types/entity';
import { TCommonResponse } from '@shared/types/service';
import { AxiosResponse } from 'axios';

// fetch
export type TFetchCandidatesResponse = AxiosResponse<TCommonResponse<TCandidate[]>>;
export type TFetchCandidateResponse = AxiosResponse<TCommonResponse<TCandidate>>;

export type TFetchCandidateParams = {
    q?: string | null
}