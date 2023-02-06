import { Box, Text, useTheme } from '@chakra-ui/react'
import React from 'react'

const HeroText = () => {
  const theme =useTheme();
  // console.log('theme ' , color.colors);
  const black = "black"
  return (
    <Box w="80%" display="flex" justifyContent="center" alignItems="center" m="auto" mt={100}>
      <Text border={`1px solid ${theme.colors.black}`} borderRadius={15} p={15} >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum similique a officiis veritatis corrupti ex veniam ipsam, voluptatem, sed fugit aliquid reprehenderit. Consequatur error deserunt doloremque ut facilis, nobis nesciunt.
      </Text>
   

    </Box>
  )
}

export default HeroText