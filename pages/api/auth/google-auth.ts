import { google } from "googleapis";

/**
 * get authenticate google 
 * @returns GoogleAuth<JSONClient>
 */
export const getGoogleAuth = () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            private_key: process.env.PRIVATE_KEY,
            client_email: process.env.CLIENT_EMAIL,
        },
        projectId: process.env.PROJECT_ID,
        scopes: process.env.DRIVE_SCOPES,
    });
    return auth;
};

/**
 * get drive service
 * @returns drive_v3.Drive
 */
export const getDriverService = () => {
    const auth = getGoogleAuth();
    return google.drive({ version: "v3", auth });
}