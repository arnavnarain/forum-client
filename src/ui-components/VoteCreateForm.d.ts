/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VoteCreateFormInputValues = {
    user?: string;
    noteId?: string;
    vote?: number;
};
export declare type VoteCreateFormValidationValues = {
    user?: ValidationFunction<string>;
    noteId?: ValidationFunction<string>;
    vote?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VoteCreateFormOverridesProps = {
    VoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    user?: PrimitiveOverrideProps<TextFieldProps>;
    noteId?: PrimitiveOverrideProps<TextFieldProps>;
    vote?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VoteCreateFormProps = React.PropsWithChildren<{
    overrides?: VoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VoteCreateFormInputValues) => VoteCreateFormInputValues;
    onSuccess?: (fields: VoteCreateFormInputValues) => void;
    onError?: (fields: VoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VoteCreateFormInputValues) => VoteCreateFormInputValues;
    onValidate?: VoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function VoteCreateForm(props: VoteCreateFormProps): React.ReactElement;
