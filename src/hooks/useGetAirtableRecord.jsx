import { useState, useEffect } from "react";

const useGetAirtableRecord = (baseId, tableIdOrName, lookupId) => {
  const [record, setRecord] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiToken =
    "patWfVfiRp1T7JnYZ.0bf7174b24b7b5609994781f24b2eb899d840085ab8fc2e3923bcf7baea00d02";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.airtable.com/v0/${encodeURIComponent(
          baseId
        )}/${encodeURIComponent(
          tableIdOrName
        )}?filterByFormula=ID%3D${encodeURIComponent(lookupId)}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiToken}`,
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
  }, [baseId, tableIdOrName, lookupId]);

  return { record, error, loading };
};

export default useGetAirtableRecord;
