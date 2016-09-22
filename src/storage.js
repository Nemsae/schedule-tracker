const JaysLibrary = {


  returnState() {
    let serializedData = localStorage.savedState;
    let savedState;

    try {
      savedState = JSON.parse(serializedData);
      return savedState;
    } catch(error) {};
  }

  receiveState(newState) {
    const serializedData = JSON.stringify(newState);
    localStorage.savedState = serializedData;
  }


}


module.exports = JaysLibrary;
