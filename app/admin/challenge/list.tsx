import { Datagrid, List, TextField, ReferenceField, NumberField, SelectField } from "react-admin";

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
            {
              id: "LEARN",
              name: "LEARN",
            }
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons" label="Lesson ID"/>
        <NumberField source="lessonId" label="lesson id real"/>
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
