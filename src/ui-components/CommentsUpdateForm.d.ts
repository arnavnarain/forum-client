/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Comments } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CommentsUpdateFormInputValues = {
    userId?: string;
    text?: string;
    userProfilePictureUrl?: string;
};
export declare type CommentsUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    text?: ValidationFunction<string>;
    userProfilePictureUrl?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CommentsUpdateFormOverridesProps = {
    CommentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    userProfilePictureUrl?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CommentsUpdateFormProps = React.PropsWithChildren<{
    overrides?: CommentsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    comments?: Comments;
    onSubmit?: (fields: CommentsUpdateFormInputValues) => CommentsUpdateFormInputValues;
    onSuccess?: (fields: CommentsUpdateFormInputValues) => void;
    onError?: (fields: CommentsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CommentsUpdateFormInputValues) => CommentsUpdateFormInputValues;
    onValidate?: CommentsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CommentsUpdateForm(props: CommentsUpdateFormProps): React.ReactElement;
