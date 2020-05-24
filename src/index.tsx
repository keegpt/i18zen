import * as React from "react";
import Context from './Context';;

export function I18ZenProvider({ locales, remoteLocales, initialLocale, fallbackLocale, errorCallback, children }: { locales?: object, remoteLocales?: I18ZenRemoteLocale[], initialLocale?: string, fallbackLocale?: string, errorCallback?: (error: Error) => void, children?: any }) {

    const [database, setDatabase] = React.useState<I18ZenDatabase>(locales || {});
    const [currentLocale, setCurrentLocale] = React.useState(initialLocale || fallbackLocale || null);

    function fetchLocale(locale: string, url: string) {
        fetch(url).then((response) => response.json().then((data) => {
            setDatabase({ ...database, [locale]: { ...data } });
        }).catch(errorCallback));
    }

    function changeLocale(locale: string): void {
        if (!database[locale]) {
            errorCallback && errorCallback(new Error('Locale not found'));
            return;
        }

        setCurrentLocale(locale);
    }

    function getCurrentLocale(): string | null {
        return currentLocale;
    }

    function __(key: string, params?: any): string {
        if (!currentLocale && !fallbackLocale) {
            return key;
        }

        let localeObj = null;

        if (currentLocale) {
            localeObj = database[currentLocale];
        } else if (fallbackLocale) {
            localeObj = database[fallbackLocale];
        }

        if (!localeObj) {
            return key;
        }

        let sentence = localeObj[key];

        if (!sentence) {
            return key;
        }

        if (params) {
            const pKeys = Object.keys(params);

            for (let i = 0; i < pKeys.length; i++) {
                const pKey: any = pKeys[i];
                const param = params[pKey];
                sentence = sentence.replace('{{' + pKey + '}}', param);
            }
        }

        return sentence;
    }

    React.useEffect(() => {
        if (remoteLocales) {
            for (let i = 0; i < remoteLocales.length; i++) {
                const remoteLocale = remoteLocales[i];
                fetchLocale(remoteLocale.locale, remoteLocale.url);
            }
        }
    }, []);

    return (
        <Context.Provider value={{ changeLocale, __, getCurrentLocale }} >
            {children}
        </Context.Provider>
    )
}

export function useI18Zen() {
    const { __, changeLocale, getCurrentLocale } = React.useContext<I18ZenContext>(Context);
    return {
        __,
        changeLocale,
        getCurrentLocale
    };
}
