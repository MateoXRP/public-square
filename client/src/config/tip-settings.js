// Tip settings
// Sets min/max tip amounts used by tip form
// Also sets increment amount for tip input
const tipSettings = {
  // currency
  XRP: {
    min: 0.1, // minimum tip amount
    max: 10, // maximum tip amount
    step: 0.1 // tip input increment
  },
  MGS: {
    min: 1,
    max: 100,
    step: 1
  }
};

export default tipSettings;
