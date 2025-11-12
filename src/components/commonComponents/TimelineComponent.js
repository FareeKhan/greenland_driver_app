import React from 'react';
import Timeline from 'react-native-timeline-flatlist';

const TimelineComponent = (props) => {
   const { data, circleSize, circleColor, isUsingFlatlist, innerCircle, showTime, titleStyle, descriptionStyle, lineColor } = props;
   return (
      <>
         <Timeline
            data={data}
            circleSize={circleSize}
            circleColor={circleColor}
            lineColor={lineColor}
            // options={{
            //     style: { paddingTop: 10, }
            // }}
            isUsingFlatlist={isUsingFlatlist}
            innerCircle={innerCircle}
            showTime={showTime}
            titleStyle={titleStyle}
            descriptionStyle={descriptionStyle}
         />

      </>
   )
}

export default TimelineComponent