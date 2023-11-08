/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  //this defines the temperature thresholds for different meat types
  const temperatureThresholds = {
    chicken: {
      well: 165, 
      medium: 160, 
      rare: 145,
    }, 
    beef: {
      well: 155, 
      medium: 138, 
      rare: 125, 
    },
  };

  //checks which meet, beef or chicken
  //is in the tempretureThresholds [object]
  if (temperatureThresholds[kind]){
    //checks if the doneness temp is valid or "medium"
    doneness = temperatureThresholds[kind][doneness] ? doneness : 'medium';
    
    //checks if the internalTemp is above the doneness temp
    if (internalTemp >= temperatureThresholds[kind][doneness]) {
      return true; 
    }
  }

  return false;
}


// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true 
console.log(foodIsCooked('beef', 138, 'rare')); // should be true