const estiloChat = { 
    chatTitle: 'My chat title',
    placeholder: 'send your message',
    submitIconSize:21,
    colors: {
        header: {
            bg: '#555',
            text: '#49347b'
        },
        message: {
            myself: {
                bg: '#49347b',
                text: '#fff'
            },
            others: {
                bg: '#535',
                text: '#fff'
            },
            messagesDisplay: {
                bg: '#3D3132'
            }
        }
    },
    borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
    },
    hideCloseButton: true, 
    submitImageIconSize:11,
    closeButtonIconSize: "20px",
    asyncMode: false,
    scrollBottom: {
        messageSent: true,
        messageReceived: false
    },
    displayHeader:true,
    profilePictureConfig: {
        others: false,
        myself: false,
        styles: {
            width: '30px',
            height: '30px',
            borderRadius: '50%'
        }
    },
    timestampConfig: {   
        format: 'HH:mm',
        relative: false
    },
}


export default estiloChat