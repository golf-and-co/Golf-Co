import React from 'react'
import styled from "styled-components"

const RecentWrap = styled.section`
  background-color: #f6f9f2;
  display:flex;
  justify-content: center;
  padding:70px 0 90px 0;
`

export const Recent = ({data}) => <RecentWrap>
    <Blog />
    <Calendar />
</RecentWrap>


export default Recent;