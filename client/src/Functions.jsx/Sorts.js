 const sortFilter = (stateArray, type) => { // arr hace referencia al array del estado allgames
    let order = stateArray;
    if (type === "A-Z") {
      order.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      });
    }
  
    if (type === "Z-A") {
      order.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        return 0;
      });
    }
  
    if (type === "5-1") order.sort((a, b) => b.rating - a.rating);
    if (type === "1-5") order.sort((a, b) => a.rating - b.rating);
  
    return order;
  };
  

  export default sortFilter