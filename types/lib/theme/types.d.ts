export type Theme = {
    colors: ThemeColors;
    typography: ThemeTypography;
    images: ThemeImages;
    spacing: ThemeSpacing;
    components: ThemeComponents;
    screens: ThemeScreens;
    modal: ThemeModal;
    popover: ThemePopover;
};
export type ThemeAppearanceBasedValue<T> = {
    light: T;
    dark: T;
};
export type ThemeSize = string;
export type ThemeFontFamily = string;
export type ThemeBorderRadius = string;
export type ThemeColor = string;
export type ThemeDynamicColor = ThemeColor | ThemeAppearanceBasedValue<ThemeColor>;
export type ThemeBoxShadow = string;
export type ThemeDynamicBoxShadow = ThemeBoxShadow | ThemeAppearanceBasedValue<ThemeBoxShadow>;
export type ThemeBorder = string;
export type ThemeDynamicBorder = ThemeBorder | ThemeAppearanceBasedValue<ThemeBorder>;
export type ThemeBackdropFilter = string;
export type ThemeDynamicBackdropFilter = ThemeBackdropFilter | ThemeAppearanceBasedValue<ThemeBackdropFilter>;
export type ThemeImageUrl = string;
export type ThemeTransitionDuration = string | number;
export type ThemeTransitionTimingFunction = string;
export type ThemeTransform = string;
export type ThemeOpacity = string | number;
export type ThemeLineCap = "round" | "butt" | "square";
export type ThemeSeparatorStyle = "all" | "all_except_last" | "none";
export type ThemeModal = {
    borderRadius: ThemeBorderRadius | null;
    boxShadow: ThemeDynamicBoxShadow | null;
    overlayBackgroundColor: ThemeDynamicColor | null;
    overlayBackdropFilter: ThemeDynamicBackdropFilter | null;
};
export type ThemePopover = {
    borderRadius: ThemeBorderRadius | null;
    boxShadow: ThemeDynamicBoxShadow | null;
};
export type ThemeColors = {
    accent: ThemeDynamicColor;
    primaryBackground: ThemeDynamicColor;
    secondaryBackground: ThemeDynamicColor;
    primaryContent: ThemeDynamicColor;
    secondaryContent: ThemeDynamicColor;
    primaryForeground: ThemeDynamicColor;
    secondaryForeground: ThemeDynamicColor;
    tertiaryForeground: ThemeDynamicColor;
    primaryFill: ThemeDynamicColor;
    secondaryFill: ThemeDynamicColor;
    tertiaryFill: ThemeDynamicColor;
    success: ThemeDynamicColor;
    warning: ThemeDynamicColor;
    error: ThemeDynamicColor;
    separator: ThemeDynamicColor;
    selection: ThemeDynamicColor;
};
export type ThemeTypography = {
    fontFamily: ThemeFontFamily;
    largeTitle: ThemeTypographyStyle;
    title1: ThemeTypographyStyle;
    title2: ThemeTypographyStyle;
    title3: ThemeTypographyStyle;
    body: ThemeTypographyStyle;
    smallBody: ThemeTypographyStyle;
    button: ThemeTypographyStyle;
    input: ThemeTypographyStyle;
};
export type ThemeImages = {
    close?: ThemeImageUrl;
    search?: ThemeImageUrl;
    spinner?: ThemeImageUrl;
    radio?: ThemeImageUrl;
    radioChecked?: ThemeImageUrl;
    checkbox?: ThemeImageUrl;
    checkboxChecked?: ThemeImageUrl;
    verified?: ThemeImageUrl;
    permissionAccountNumbers?: ThemeImageUrl;
    permissionBalances?: ThemeImageUrl;
    permissionIdentity?: ThemeImageUrl;
    permissionTransactions?: ThemeImageUrl;
    mfaSms?: ThemeImageUrl;
    mfaEmail?: ThemeImageUrl;
    mfaPhone?: ThemeImageUrl;
};
export declare enum ThemeTypographyTextStyle {
    largeTitle = 0,
    title1 = 1,
    title2 = 2,
    title3 = 3,
    body = 4,
    smallBody = 5,
    button = 6,
    input = 7
}
export type ThemeTypographyStyle = {
    fontFamily?: ThemeFontFamily;
    size: string;
    lineHeight: string;
    letterSpacing: string;
    weight: ThemeTypographyWeight;
};
export type ThemeTypographyWeight = "normal" | "bold" | "lighter" | "bolder" | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | "inherit" | "initial" | "revert" | "revert-layer" | "unset";
export type ThemeSpacing = {
    contentHorizontalInset: string;
    buttonHorizontalInset: string;
};
export type ThemeComponents = {
    navigationBar: ThemeComponentsNavigationBar;
    contentView: ThemeComponentsContentView;
    buttonPrimary: ThemeComponentsButton;
    searchInput: ThemeComponentsSearchInput;
    textField: ThemeComponentsTextField;
    progressSpinner: ThemeComponentsProgressSpinner;
    icon: ThemeComponentsIcon;
    separator: ThemeComponentsSeparator;
};
export type ThemeComponentsNavigationBar = {
    height: string;
};
export type ThemeComponentsContentView = {
    borderRadius: ThemeBorderRadius;
    boxShadow: ThemeDynamicBoxShadow | null;
    border: ThemeDynamicBorder | null;
    separatorStyle: ThemeSeparatorStyle;
};
export type ThemeComponentsButton = {
    height: ThemeSize;
    borderRadius: ThemeBorderRadius;
    inheritInstitutionColor: boolean;
};
export type ThemeComponentsSearchInput = {
    backgroundColor: ThemeDynamicColor | null;
    height: ThemeSize;
    borderRadius: ThemeBorderRadius;
    border: ThemeDynamicBorder | null;
    alignment: "left" | "center";
    focus: {
        glow: boolean;
        backgroundColor: ThemeDynamicColor | null;
        border: ThemeDynamicBorder | null;
        boxShadow: ThemeDynamicBoxShadow | null;
    };
};
export type ThemeComponentsTextField = {
    backgroundColor: ThemeDynamicColor | null;
    height: ThemeSize;
    borderRadius: ThemeBorderRadius;
    boxShadow: ThemeDynamicBoxShadow | null;
    focus: {
        glow: boolean;
        backgroundColor: ThemeDynamicColor | null;
        border: ThemeDynamicBorder | null;
        boxShadow: ThemeDynamicBoxShadow | null;
    };
};
export type ThemeComponentsProgressSpinner = {
    strokeWidth: number;
    diameter: number;
    lineCap: ThemeLineCap;
};
export type ThemeComponentsIcon = {
    strokeWidth: number;
    lineCap: ThemeLineCap;
};
export type ThemeComponentsSeparator = {
    height: ThemeSize;
};
export type ThemeScreens = {
    finder: ThemeScreensFinder;
};
export type ThemeScreensFinder = {
    title: string;
    subtitle: string | null;
    searchPlaceholder: string;
    institutionCellBoxShadow: ThemeDynamicBoxShadow | null;
    institutionCellBorderRadius: ThemeBorderRadius;
    institutionCellBorder: ThemeDynamicBorder | null;
    institutionCellSpacing: string;
    institutionCellBackgroundColor: ThemeDynamicColor | null;
};
