
const addToFavoriteList = (movie) => {
    let currentList = JSON.parse(localStorage.getItem('favorites'));
    let idList = currentList.map(item => item.id);
    if(idList.includes(movie.id)) return;
    currentList.push(movie);
    localStorage.setItem('favorites', JSON.stringify(currentList));
    return currentList;
}

const removeFromFavoriteList = (id) => {
    let currentList = JSON.parse(localStorage.getItem('favorites'));
    let idList = currentList.map(item => item.id);
    if(!idList.includes(id)) return;
    const index = idList.indexOf(id);
    currentList.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(currentList));
    return currentList;
}

export {
    addToFavoriteList,
    removeFromFavoriteList
}