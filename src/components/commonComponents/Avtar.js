import React from 'react'
import { Avatar } from '@rneui/themed';
const Avtar = (props) => {
    const { size, source, title, containerStyle, titleStyle } = props;
    return (
        <Avatar
            size={size}
            rounded
            source={source}
            title={title}
            titleStyle={titleStyle}
            containerStyle={containerStyle}
        />
    )
}

export default Avtar