interface I18ZenDatabase {
  [key: string]: any;
}

interface I18ZenContext {
  __: (key: string, params?: any) => string;
  changeLocale: (locale: string) => void;
}

interface I18ZenRemoteLocale {
  locale: string;
  url: string;
}
