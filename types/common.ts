/**
 * @file Common TypeScript Definitions - Generic helper types, async state discriminated unions, and API contracts.
 */

export type AsyncState<TData, TError = string> =
  | { readonly status: "idle" }
  | { readonly status: "loading"; readonly progress?: number }
  | { readonly status: "success"; readonly data: TData }
  | { readonly status: "error"; readonly error: TError };

export interface ActionResponse<TData> {
  readonly ok: boolean;
  readonly state: AsyncState<TData>;
  readonly timestamp: string;
}

export interface SelectOption<TValue extends string = string> {
  readonly value: TValue;
  readonly label: string;
  readonly description?: string;
}

export interface WithClassName {
  readonly className?: string;
}

export type ThemeTone = "light" | "dark" | "mist";
