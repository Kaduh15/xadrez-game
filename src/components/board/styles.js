import styled from 'styled-components';

export const Line = styled.div`
  display: flex;
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const House = styled.div`
  background-color: ${({ isWhite, selected }) => {
    if (selected) return '#fff111';
    if (isWhite) return '#fff';
    return '#000';
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;
