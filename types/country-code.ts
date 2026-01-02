export enum CountryCode {
  UAE = 'UAE',
  KSA = 'KSA',
}

export const COUNTRY_CODE_OPTIONS = [
  { label: 'UAE', value: CountryCode.UAE },
  { label: 'KSA', value: CountryCode.KSA },
] as const;
