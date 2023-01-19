export function getDiceSumProbabilities(quantity) {
  let rolls = {}

  if (quantity > 1) {
    // if there is more than one dice to roll
    const nMinus1Rolls = getDiceSumProbabilities(quantity - 1);
    const newRolls = {};
    Object.keys(nMinus1Rolls).forEach(key => {
      for (let i = 1; i <= 6; i++) {
        const sum = i + Number(key);
        if (newRolls[sum]) newRolls[sum] += nMinus1Rolls[key]
        else newRolls[sum] = nMinus1Rolls[key]
      }
    })
    rolls = { ...newRolls }
  } else {
    // if we are only rolling 1 dice
    for (let i = 1; i <= 6; i++) {
      rolls[i] = 1;
    }
  }
  return rolls
}

export const getMedian = (valuesObject) => {
  const keys = Object.keys(valuesObject);
  const numberOfRolls = getNumberOfRolls(valuesObject);
  const half = Math.ceil(numberOfRolls / 2);
  let sum = 0;

  if (numberOfRolls % 2 === 0) {
    for (let i = 0; i < keys.length; i++) {
      sum += valuesObject[keys[i]];
      if (sum === half) {
        return (Number(keys[i]) + Number(keys[i + 1])) / 2;
      } else if (sum > half) {
        return keys[i];
      }
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      sum += valuesObject[keys[i]];
      if (sum >= half) {
        return keys[i];
      }
    }
  }
}

export const getVariance = (valuesObject) => {
  const numberOfRolls = getNumberOfRolls(valuesObject);
  const mean = getMean(valuesObject)
  const keys = Object.keys(valuesObject);
  
  const sum = keys.reduce((out,key) => {
    return out + ((key  - mean) ** 2) * valuesObject[key];
  },0);

  return sum / numberOfRolls;
}

export const getSumOfDiceValues = valuesObject => Object.keys(valuesObject).reduce((a, b) => a + b * valuesObject[b], 0);
export const getNumberOfRolls = valuesObject => Object.values(valuesObject).reduce((a,b) => a + b, 0);
export const getMean = valuesObject => getSumOfDiceValues(valuesObject) / getNumberOfRolls(valuesObject);


/* ================================================== */
/* The Normal distribution probability density function (PDF)
   for the specified mean and specified standard deviation: */
export function getNormDist (x, mu, sigma) {
    const num = Math.exp(-Math.pow((x - mu), 2) / (2 * Math.pow(sigma, 2)))
    const denom = sigma * Math.sqrt(2 * Math.PI)
    return num / denom
}