export interface AuthDataInterface {
    userId: string,
    email: string,
    accessToken: string,
}

export interface ContextDataInterface {
    userId: string,
    email: string,
    accessToken: string,
    budgets: string[],
    isAuthenticated: boolean,
    changeAuthState: Function,
    logout: Function,
}

export interface InitialValuesInterface {
    email: string,
    password: string,
    rePass?: string,
}

export interface FormErrorsInterface {
    email?: string,
    password?: string,
    rePass?: string
}