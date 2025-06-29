import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Icon,
  Title,
  Fields,
  Field,
  Label,
  Value
} from "../components/Card";

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const EnvironmentItem = ({ type, title, url }) => {
  const [reading, setReading] = useState(70);

  const fetchReading = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setReading(data.last_value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchReading();
    const interval = setInterval(fetchReading, 10000);
    return () => clearInterval(interval);
  }, [fetchReading]);

  return (
    <Card>
      <Icon>
        <FontAwesomeIcon
          icon={type === "temperature" ? fas.faTemperatureLow : fas.faWater}
        />
      </Icon>
      <Title>
        {reading}
        {type === "temperature" ? "°" : "%"}
      </Title>
      <Fields>
        <Field>
          <Label>{title}</Label>
          <Value>{type === "temperature" ? "Farenheit" : "RHUM"}</Value>
        </Field>
      </Fields>
    </Card>
  );
};

const Environment = () => {
  return (
    <Cards>
      <EnvironmentItem
        type="temperature"
        title="Temperature"
        url="https://io.adafruit.com/api/v2/dzaharia/feeds/temperature"
      />
      <EnvironmentItem
        type="humidity"
        title="Humidity"
        url="https://io.adafruit.com/api/v2/dzaharia/feeds/humidity"
      />
    </Cards>
  );
};

export default Environment;
