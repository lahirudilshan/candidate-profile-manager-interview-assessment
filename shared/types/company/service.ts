import { TCompany } from "@shared/types/company/entity";
import { AxiosResponse } from "axios";
import { TCommonResponse } from "../service";

export type TCompanyResponse = AxiosResponse<TCommonResponse<TCompany[] | null>>