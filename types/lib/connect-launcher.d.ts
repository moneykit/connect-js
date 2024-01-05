import { type Theme, type ThemeTypographyStyle, ThemeTypographyTextStyle } from "./theme";
export type Institution = {
    avatar: string | null;
    avatar_dark: string | null;
    color: string;
    color_dark: string | null;
    country: string;
    domain: string;
    id: string;
    logo: string | null;
    logo_dark: string | null;
    name: string;
    search_group: "primary" | "secondary" | "tertiary";
};
export type AccountType = "depository.cash" | "depository.checking" | "depository.savings" | "depository.prepaid" | "depository.other" | "credit_card" | "loan.general" | "loan.mortgage" | "loan.other" | "investment" | "other";
export type LinkedInstitution = Institution & {
    selectedAccounts: {
        account_id: string;
        account_type: AccountType;
        name: string;
        account_mask: string | null;
    }[];
    trackedScreens: {
        tag: string;
        name: string;
        duration: number;
    }[];
};
export type MoneyKitDevice = "mobile" | "desktop";
export type MoneyKitOptions = {
    applicationName?: string;
    theme?: Theme;
    device?: MoneyKitDevice;
    stepTimers?: boolean;
    containerID?: string;
    __onDemoEvent?: LinkEventCallback;
};
export type LinkSuccessCallback = (exchangeableToken: string, institution: LinkedInstitution) => void;
export type RelinkSuccessCallback = (institution: LinkedInstitution) => void;
export type LinkExitCallback = (error: LinkExitError | null) => void;
export type LinkEventCallback = (event: Record<string, unknown>) => void;
export type LinkExitError = {
    error_id: string;
    displayed_message: string;
    request_id: string | null;
};
declare class MoneyKit {
    options: MoneyKitOptions;
    constructor(options?: MoneyKitOptions);
    link(linkSessionToken: string, onLinkSuccess?: LinkSuccessCallback, onLinkExit?: LinkExitCallback, onLinkEvent?: LinkEventCallback): void;
    relink(linkSessionToken: string, onRelinkSuccess?: RelinkSuccessCallback, onRelinkExit?: LinkExitCallback, onRelinkEvent?: LinkEventCallback): void;
    continue(redirectURL: string, onLinkSuccess?: LinkSuccessCallback, onLinkExit?: LinkExitCallback, onLinkEvent?: LinkEventCallback): void;
    __linkDirect(linkSessionToken: string, onLinkSuccess?: LinkSuccessCallback, onLinkExit?: LinkExitCallback, onLinkEvent?: LinkEventCallback): void;
    __continueDirect(redirectURL: string, onLinkSuccess?: LinkSuccessCallback, onLinkExit?: LinkExitCallback, onLinkEvent?: LinkEventCallback): void;
    private startLink;
    private continueLink;
    private linkParametersFromOptions;
    private launch;
}
export default MoneyKit;
export declare const themeTypographyStyleForTextStyle: (theme: Theme, textStyle: ThemeTypographyTextStyle) => ThemeTypographyStyle;
