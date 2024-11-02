import { SimpleForm, Create, TextInput, ReferenceInput, required, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
      <TextInput source="id" label="ID" />
        <TextInput 
          source="text" 
          validate={[required()]} 
          label="Text"
        />
        <BooleanInput
          source="correct"
          label="Correct option"
        />
        <TextInput source="challengeId" label="Challenge Id"></TextInput>
        <ReferenceInput source="challengeId" reference="challenges"/>
        <TextInput
          source="imageSrc"
          label="Image URL"
        />
        <TextInput
          source="audioSrc"
          label="Audio URL"
        />
      </SimpleForm>
    </Create>
  );
};
