export const getAccessToken = (): string | null => {
    const authJSON: string | null = localStorage.getItem('auth');

    if (!authJSON) {
        return '';
    }

    const authData = JSON.parse(authJSON);

    return authData?.accessToken;
};