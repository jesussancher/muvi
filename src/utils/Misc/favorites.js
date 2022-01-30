
const addToFavoriteList = (id) => {
    let currentList = JSON.parse(localStorage.getItem('favorites'));
    if(currentList.includes(id)) return;
    currentList.push(id);
    localStorage.setItem('favorites', JSON.stringify(currentList));
    return currentList;
}

const removeFromFavoriteList = (id) => {
    let currentList = JSON.parse(localStorage.getItem('favorites'));
    if(!currentList.includes(id)) return;
    const index = currentList.indexOf(id);
    currentList.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(currentList));
    return currentList;
}

export {
    addToFavoriteList,
    removeFromFavoriteList
}