import { Stack, Typography } from '@mui/material'
import React from 'react'
import { colorTheme } from '../../components/colorTheme/ColorTheme'

const NoChatroomSelected = () => {
  return (
    <div id="no__chatroomSelectedMainDiv" style={{ backgroundColor: "white" }}>
        <Stack direction="row" justifyContent="center" alignItems="center" style={{ height: "calc(100vh - 5rem)" }}>
            <Typography variant="h5" style={{ fontWeight: "600", color: `${colorTheme.palette.secondary.main}` }}>
                No Chatroom Selected!
            </Typography>
        </Stack>
    </div>
  )
}

export default NoChatroomSelected