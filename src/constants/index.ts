export const TITLE_APP = 'Insa';
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
export const FACEBOOK_SCOPE =
    'pages_manage_metadata,pages_read_engagement,pages_read_user_content,pages_messaging,pages_manage_engagement,pages_manage_posts,pages_show_list';

export const API_URI = process.env.REACT_APP_API_URI as string;
export const GOOGLE_APP_ID = process.env.REACT_APP_GOOGLE_APP_ID as string;
export const STORE_URL = process.env.REACT_APP_STORE_URL as string;
export const HOME_URL = process.env.REACT_APP_HOME_URL as string;

const isMissingEnv  = !API_URI || !FACEBOOK_SCOPE || !FACEBOOK_APP_ID || !STORE_URL || !HOME_URL;

// if(isMissingEnv) {
//     throw new Error('Missing required env');
// }
