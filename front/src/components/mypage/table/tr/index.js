import React from "react";
import Td from "components/mypage/table/tr/td"

function Tr({info}) {
  return (
    <tbody>
        {
            info.map(item => {
                return (
                    <Td key={item.id} item={item}  />
                )
            })
        }
    </tbody>
  )
}

export default Tr;