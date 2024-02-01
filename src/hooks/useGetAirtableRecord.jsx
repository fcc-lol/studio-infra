import { useState, useEffect } from "react";

const useGetAirtableRecord = (lookupId) => {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.airtable.com/v0/${encodeURIComponent(
          process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
        )}/${encodeURIComponent(
          process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID
        )}?filterByFormula=ID%3D${encodeURIComponent(lookupId)}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRecord(data.records[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lookupId]);

  return { record, error, loading };
};

export default useGetAirtableRecord;
