import { SimpleForm, Create, TextInput, required } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
      <TextInput source="id" label="ID" />
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <TextInput 
          source="imageSrc" 
          validate={[required()]} 
          label="Image"
        />
      </SimpleForm>
    </Create>
  );
};
