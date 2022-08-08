import styled from 'styled-components';

export const Line = styled.div`
  display: flex;
`;

export const House = styled.div`
  background-color: ${(props) => (props.isWhite ? '#d6d6d6' : '#616161')};
  width: 5rem;
  height: 5rem;
`;
