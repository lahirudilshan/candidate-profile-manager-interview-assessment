import { Candidate } from "@prisma/client";

export type TProfileCreatePayload = Candidate;

export type TProfileCreateResponse = {
    success: boolean,
    data?: Candidate | null | any;
    message?: string
}
