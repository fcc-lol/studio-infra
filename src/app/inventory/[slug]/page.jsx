"use client";

import React from "react";
import useGetAirtableRecord from "@/hooks/useGetAirtableRecord";

const Item = ({ params }) => {
  const { record, error, loading } = useGetAirtableRecord(params.slug);

  return (
    <div>
      {record &&
        record.fields &&
        Object.keys(record.fields).map((key) => {
          return (
            <div key={key}>
              {key}: {record.fields[key]}
            </div>
          );
        })}
    </div>
  );
};

export default Item;
