import React from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card';
import PropTypes from 'prop-types';
import { images } from '../images';


const Task = ({ data, reverseCard }) => {
  const { id, item, status, idx } = data;

  const handleClick = () => {
    if (reverseCard && !status) {
      reverseCard(idx);
    }
  };

  return (
    <TouchableOpacity onPress={handleClick} disabled={status}>
      <FlipCard
        style={{ flex: 1, height: 100, perspective: 600 }}
        friction={1}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={status}
        clickable={false}
      >
        {/* Face Side */}
        <View style={{ width: 50, height: 50, margin: 10, backgroundColor: 'green' }} />
        {/* Back Side */}
        <Image
          source={images[item]}
          style={{ width: 50, height: 50, margin: 10 }}
        />
      </FlipCard>
    </TouchableOpacity>
  );
};
  
Task.propTypes = {
  data: PropTypes.object.isRequired,
  reverseCard: PropTypes.func.isRequired,
};

export default Task;
