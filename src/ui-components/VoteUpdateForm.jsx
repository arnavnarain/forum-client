/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Vote } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function VoteUpdateForm(props) {
  const {
    id: idProp,
    vote: voteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    user: "",
    noteId: "",
    vote: "",
  };
  const [user, setUser] = React.useState(initialValues.user);
  const [noteId, setNoteId] = React.useState(initialValues.noteId);
  const [vote, setVote] = React.useState(initialValues.vote);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = voteRecord
      ? { ...initialValues, ...voteRecord }
      : initialValues;
    setUser(cleanValues.user);
    setNoteId(cleanValues.noteId);
    setVote(cleanValues.vote);
    setErrors({});
  };
  const [voteRecord, setVoteRecord] = React.useState(voteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Vote, idProp)
        : voteModelProp;
      setVoteRecord(record);
    };
    queryData();
  }, [idProp, voteModelProp]);
  React.useEffect(resetStateValues, [voteRecord]);
  const validations = {
    user: [{ type: "Required" }],
    noteId: [{ type: "Required" }],
    vote: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          user,
          noteId,
          vote,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Vote.copyOf(voteRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "VoteUpdateForm")}
      {...rest}
    >
      <TextField
        label="User"
        isRequired={true}
        isReadOnly={false}
        value={user}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user: value,
              noteId,
              vote,
            };
            const result = onChange(modelFields);
            value = result?.user ?? value;
          }
          if (errors.user?.hasError) {
            runValidationTasks("user", value);
          }
          setUser(value);
        }}
        onBlur={() => runValidationTasks("user", user)}
        errorMessage={errors.user?.errorMessage}
        hasError={errors.user?.hasError}
        {...getOverrideProps(overrides, "user")}
      ></TextField>
      <TextField
        label="Note id"
        isRequired={true}
        isReadOnly={false}
        value={noteId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user,
              noteId: value,
              vote,
            };
            const result = onChange(modelFields);
            value = result?.noteId ?? value;
          }
          if (errors.noteId?.hasError) {
            runValidationTasks("noteId", value);
          }
          setNoteId(value);
        }}
        onBlur={() => runValidationTasks("noteId", noteId)}
        errorMessage={errors.noteId?.errorMessage}
        hasError={errors.noteId?.hasError}
        {...getOverrideProps(overrides, "noteId")}
      ></TextField>
      <TextField
        label="Vote"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={vote}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              user,
              noteId,
              vote: value,
            };
            const result = onChange(modelFields);
            value = result?.vote ?? value;
          }
          if (errors.vote?.hasError) {
            runValidationTasks("vote", value);
          }
          setVote(value);
        }}
        onBlur={() => runValidationTasks("vote", vote)}
        errorMessage={errors.vote?.errorMessage}
        hasError={errors.vote?.hasError}
        {...getOverrideProps(overrides, "vote")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || voteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || voteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
