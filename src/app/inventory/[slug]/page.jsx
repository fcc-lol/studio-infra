"use client";

import React from "react";
import useGetAirtableRecord from "@/hooks/useGetAirtableRecord";

const Item = ({ params }) => {
  const { record, error, loading } = useGetAirtableRecord(
    "appxyLl3mbU8R140s",
    "tblD5sGFaoz2Qr6ZQ",
    params.slug
  );

  console.log(record);

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
