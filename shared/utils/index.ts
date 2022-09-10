import { TWorkExperience } from '@modules/profiles/types/work-experience/entity';
import { TCandidate } from "@modules/profiles/types/entity";
import { FormInstance } from "antd";
import { RcFile } from "antd/lib/upload";
import moment from "moment";
import { TYearsOfExperienceParams } from '@shared/types/utils';

// variables
export const defaultUserProfile = '/static/images/default-user.jpeg';

/**
 * get file as based64 string
 * @param file 
 * @returns Promise<string>
 */
export const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}

/**
 * check form status
 * @returns
 * @return Promise
 */
export const isFormValid = async (form: FormInstance) => {
    return new Promise(async resolve => {
        try {
            await form.validateFields();

            resolve(true);
        } catch (errors) {
            resolve(false);
        }
    });
};

/**
 * 
 * @param date: string 
 * @param option option?: Intl.DateTimeFormatOptions
 * @returns string
 */
export const dateFormat = (date: string | Date | undefined, option?: Intl.DateTimeFormatOptions) => {
    const defaultOption: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    if (!date) return '';

    return new Date(date).toLocaleDateString(`${localStorage.getItem('locale') || 'sv-SE'}`, option || defaultOption);
};

/**
 * disable future date
 * @param current 
 * @returns boolean
 */
export const disableFutureDate = (current: moment.Moment) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current > moment(customDate, "YYYY-MM-DD");
}

/**
 * get latest experience
 * @param data 
 * @returns 
 */
export const getLatestExperience = (data: TCandidate, field: string | undefined = undefined): TWorkExperience => {
    const key = data.workExperiences?.length > 0 ? data.workExperiences.length - 1 : 0;

    if (field) {
        return data && data.workExperiences && data.workExperiences[key] as TWorkExperience;
    }

    return data && data.workExperiences && data.workExperiences[key] as TWorkExperience;
}

/**
 * generate slug from string
 * @param text: string
 * @returns 
 */
export const stringToSlug = (text: string) => {
    return text && text.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || '';
}

/**
 * remove spaces from text
 * @param value: text
 * @returns string: trim text
 */
export const removeSpaces = (value: string) => {
    return value.replace(/^\s+|\s+$/gm, '');
};

/**
 * get total years of experience
 * @param { startDate: string | Date, endDate: string | Date | null }
 * @return void
 */
export const getTotalYearsOfExperience = ({ startDate, endDate }: TYearsOfExperienceParams) => {
    startDate = new Date(startDate);
    endDate = new Date(endDate && endDate || new Date());

    return Math.abs(startDate.getUTCFullYear() - endDate.getUTCFullYear());
}

/**
 * get total years of experience with texts 
 * @param { startDate, endDate }: TYearsOfExperienceParams 
 * @returns string
 */
export const getTotalYearsOfExperienceWithText = ({ startDate, endDate }: TYearsOfExperienceParams) => {
    const totalYearsOfExperience = getTotalYearsOfExperience({ startDate, endDate });

    return totalYearsOfExperience ?
        `${totalYearsOfExperience}+ Years of Experience` :
        startDate ?
            'Less than 1 Year experience' :
            'No Experience candidate'
}