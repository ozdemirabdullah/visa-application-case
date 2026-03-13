import en from '@/messages/en.json';

type Messages = typeof en;

export function useTranslation() {
  function t(key: string, params?: Record<string, string>): string {
    const parts = key.split('.');
    let value: any = en;
    for (const part of parts) {
      value = value?.[part];
    }

    if (typeof value !== 'string') {
      console.warn(`[i18n] Missing translation key: "${key}"`);
      return key;
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), v),
        value
      );
    }

    return value;
  }

  return { t, locale: 'en' as const };
}

export type { Messages };
