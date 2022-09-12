import { google } from "googleapis";

/**
 * get authenticate google 
 * @returns GoogleAuth<JSONClient>
 */
export const getGoogleAuth = () => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        },
        projectId: process.env.PROJECT_ID,
        scopes: process.env.GOOGLE_SERVICE_ACCOUNT_SCOPE,
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