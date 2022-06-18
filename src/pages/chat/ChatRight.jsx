import { Stack } from '@mui/material'
import React from 'react'
import ChatRightHeader from './ChatRightHeader'
import ChatRightMessage from './ChatRightMessage'

const ChatRight = () => {
  return (
    <div style={{ height: "100%" }}>
        <div id="Chat__rightDiv" style={{ height: "100%" }}>
            <Stack direction="column" style={{ height: "100%" }}>
                <ChatRightHeader />
                <ChatRightMessage />
            </Stack>
        </div>
    </div>
  )
}

export default ChatRight