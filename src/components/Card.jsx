import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  transition: transform 0.1s ease-in-out;

  background: white;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.125);
  }

  ${({ $status }) => {
    switch ($status) {
      case "loading":
        return `
          background: rgba(var(--foreground-rgb), 0.1)!important;
        `;
      case "success":
        return `
          background: rgb(82, 214, 70) !important;

          @media (prefers-color-scheme: dark) {
            background: rgba(0, 255, 0, 0.5)!important;
          }
        `;
      case "error":
        return `
          background: rgb(237, 62, 62) !important;

          @media (prefers-color-scheme: dark) {
          background: rgba(255, 0, 0, 0.5)!important;
          }
        `;
      default:
        return "";
    }
  }}

  ${({ $isLoading }) =>
    $isLoading &&
    `
      opacity: 0.5;
    `}

  ${({ $isClickable }) =>
    $isClickable &&
    `
      cursor: pointer;

      &:active {
        transform: scale(0.9);
        opacity: 0.5;
      }
    `}
`;

export const Icon = styled.div`
  width: 3rem;
  height: 4rem;
  font-size: 3rem;
  margin: 0.5rem 0 1rem 0;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  line-height: 3.5rem;
  font-weight: bold;
  padding-right: 1rem;
  text-align: left;
`;

export const Loading = styled(Title)`
  font-weight: normal;
  margin-bottom: 0;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

export const Label = styled.div`
  font-size: 0.75rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.125rem;
  text-align: left;

  color: rgba(0, 0, 0, 0.25);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.25);
  }
`;

export const Value = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: normal;
  text-align: left;

  color: rgba(0, 0, 0, 0.8);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.8);
  }
`;
