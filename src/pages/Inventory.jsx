import React from "react";
import { useParams } from "react-router-dom";
import useGetAirtableRecord from "../hooks/useGetAirtableRecord";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Icon,
  Title,
  Fields,
  Field,
  Label,
  Value,
  Loading
} from "../components/Card";

function Inventory() {
  const { id } = useParams();
  const { record, error, loading } = useGetAirtableRecord(id || null);

  if (id === undefined) {
    return (
      <Card>
        <Icon>
          <FontAwesomeIcon icon={fas["faCircleQuestion"]} />
        </Icon>
        <Title>Tap any item</Title>
        <Value style={{ marginTop: "1rem" }}>
          View name, owner, notes, and cost
        </Value>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card $isLoading={true}>
        <Icon>
          <FontAwesomeIcon icon={fas["faAsterisk"]} spin />
        </Icon>
        <Loading>Loading...</Loading>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Title>Error loading item</Title>
        <Value>{error.message}</Value>
      </Card>
    );
  }

  return (
    record &&
    record.fields && (
      <Card>
        <Icon>
          <FontAwesomeIcon icon={fas[`fa${record.fields["Icon"]}`]} />
        </Icon>
        <Title>{record.fields["Name"]}</Title>
        <Fields>
          {record.fields["Notes"] && (
            <Field>
              <Label>Notes</Label>
              <Value>{record.fields["Notes"]}</Value>
            </Field>
          )}
          <Field>
            <Label>Owner</Label>
            <Value>{record.fields["Owner"]}</Value>
          </Field>
        </Fields>
      </Card>
    )
  );
}

export default Inventory;
