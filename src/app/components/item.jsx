"use client";

import React from "react";
import useGetAirtableRecord from "@/hooks/useGetAirtableRecord";
import styled from "styled-components";

const Title = styled.div`
  font-size: 3.5rem;
  line-height: 4rem;
  font-weight: bold;
  margin-bottom: 3rem;
  padding-right: 1rem;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.div`
  font-size: 0.75rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.25rem;

  color: rgba(0, 0, 0, 0.5);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.5);
  }
`;
const Value = styled.div`
  font-size: 1.25rem;
  line-height: 2rem;
  font-weight: regular;

  color: rgba(0, 0, 0, 0.8);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Item = ({ slug }) => {
  const { record, error, loading } = useGetAirtableRecord(slug);

  return (
    <div>
      {record && record.fields && (
        <>
          <Title>{record.fields["Name"]}</Title>
          <Fields>
            {record.fields["Description"] && (
              <Field>
                <Label>Description</Label>
                <Value>{record.fields["Description"]}</Value>
              </Field>
            )}
            <Field>
              <Label>Owner</Label>
              <Value>{record.fields["Owner"]}</Value>
            </Field>
          </Fields>
        </>
      )}
    </div>
  );
};

export default Item;
