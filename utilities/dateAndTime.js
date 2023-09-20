const formatDateTime = (date) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
  
    return new Date(date).toLocaleString(undefined, options);
  }
  
  const DateTimeDisplay = () => {
    const currentDateTime = new Date();
  
    return formatDateTime(currentDateTime);
  }

  module.exports = {DateTimeDisplay}