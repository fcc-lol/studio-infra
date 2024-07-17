"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div`
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  background: white;
  margin-bottom: 2rem;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.03))
    drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.03))
    drop-shadow(0px 2px 32px rgba(0, 0, 0, 0.1));
  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.125);
  }
`;
const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  font-size: 3rem;
  margin: 0.5rem 0 1rem 0;
`;
const Title = styled.div`
  font-size: 2.5rem;
  line-height: 3.5rem;
  font-weight: bold;
  margin-bottom: 2.5rem;
  padding-right: 1rem;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  letter-spacing: 0.125rem;

  color: rgba(0, 0, 0, 0.25);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.25);
  }
`;
const Value = styled.div`
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 400;

  color: rgba(0, 0, 0, 0.8);
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const EnvironmentItem = ({ type, title, url }) => {
    const [reading, setReading] = useState(70);

    const fetchReading = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setReading(data.last_value);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        const interval = setInterval(fetchReading, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <Card>
                <Icon>
                    <FontAwesomeIcon icon={type == 'temperature' ? fas.faTemperatureLow : fas.faWater} />
                </Icon>
                <Title>{title}</Title>
                <Fields>
                    <Field>
                        <Value>{reading}{type == 'temperature' ? '°' : '%'}</Value>
                        <Label>{ type == 'temperature' ? 'Farenheit' : 'RHUM' }</Label>
                    </Field>
                </Fields>
            </Card>
        </div>
    );
};

export default EnvironmentItem;
