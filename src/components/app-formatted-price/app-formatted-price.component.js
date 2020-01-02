import React from 'react';
const AppFormattedPrice = (props) => {
  const formattedEuroValue = `${props.value.toFixed(2)}`;
  return (
    <>
      &euro;{formattedEuroValue}
    </>
  );
}

export default AppFormattedPrice;