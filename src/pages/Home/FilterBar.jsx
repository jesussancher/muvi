import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import { Icon, Tag } from '../../components';

function FilterBar(props) {

    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState({id: '', name: ''});
    const [closedWidth, setClosedWidth] = useState(100);
    const [sortedGenresList, setSortedGenresList] = useState([]);
    const noFilterGenre = {id: null, name: 'All'};

    const {
        title,
        genresList,
        getSelected,
    } = props;

    const drawFilters = () => {
        const filtersNodeList  = sortedGenresList?.map((genre, index) => {
            return <Fragment key={index}><Tag id={genre.name} text={genre.name} active={genre.id === selected.id} onClick={() => handleOnFilterSelection(genre)}/></Fragment>
        });

        return filtersNodeList;
    }
    
    const drawFiltersDummy = () => {
        const dummyCardsList = (new Array(20)).fill(null);
        const filtersNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><Tag index={index} dummy/></Fragment>
        })

        return filtersNodeList;
    }

    const handleOnFilterSelection = (genre) => {
        let genreObj;
        if(genre.id === selected.id) {
            genreObj = noFilterGenre;
            setOpen(true);
        } else {
            genreObj = genre;
            setOpen(false);
        }
        setSelected(genreObj);
        getSelected(genreObj);
        sortList(genreObj);
    }

    const sortList = (selected) => {
        const index = genresList.findIndex(genre => genre.id === selected.id);
        let newList = [...genresList];
        newList.splice(index, 1);
        if(selected.name !== 'All') {
            setSortedGenresList([selected, noFilterGenre, ...newList]);
        } else {
            setSortedGenresList([selected, ...newList]);
        }
    }

    const toggleOpenPanel = () => {
        setOpen(prev => !prev);
    }

    useEffect(() => {
        if(genresList.length === 0) return;
        setSelected(noFilterGenre);
        setSortedGenresList([noFilterGenre, ...genresList]);
    },[genresList]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(selected && selected.id === '') return;
        const selectedTag = document.querySelector(`#${selected.name.split(' ').join('')}Tag`);
        setClosedWidth(selectedTag.offsetWidth - 2);
    },[selected])

    const scrollOnMouseWheel = (event) => {
        const filterBar = document.querySelector("#filterBar");
        if(!filterBar.classList.contains('open')) return;
        event.preventDefault();
        if(!filterBar) return;
        filterBar.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        const filterBar = document.querySelector("#filterBar");
        filterBar.addEventListener('wheel', scrollOnMouseWheel);
        
        return function cleanup() {
            filterBar.removeEventListener('wheel', scrollOnMouseWheel);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const filterBar = document.querySelector("#filterBar");
        if(!open) {filterBar.scrollLeft = 0;}
    },[open])

    return (
        <section id={'filterBarPanel'} >
            <h1>{title}</h1>
            <div className={'filter-containter flex-row flex-row-center-vert'}>
                <div id={'filterBar'} style={{width: open ? undefined: closedWidth}} className={classNames('filter-content shadow-soft flex-row flex-row-center-vert', {'open': open})}>
                    {sortedGenresList ?
                        drawFilters()
                    :
                        drawFiltersDummy()
                    }
                </div>
                <div className={'filter-opener flex-center flex-column'} onClick={toggleOpenPanel}>
                    <Icon icon={open ? 'chevron-left' : 'chevron-right'} />
                </div>
            </div>
        </section>
    )
}

export default FilterBar