import styled from 'styled-components';

export const GalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 82px);
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
