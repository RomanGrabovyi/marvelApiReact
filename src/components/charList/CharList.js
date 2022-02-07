import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelService';
import './charList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMassege from '../errorMassege/ErrorMassege';

class CharList extends Component{
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1560,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
      this.onReguest();
}

onReguest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
}

onCharListLoading = () => {
    this.setState({
        newItemLoading: true
    })
}

onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length < 9) {
        ended = true;
    }



    this.setState(({offset, charList}) => ({
        charList: [...charList, ...newCharList],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended
    }))
}

onError = () => {
    this.setState({
        error: true,
        loading: false
    })
}

itemRef = [];

setRef = (ref) => {
    this.itemRef.push(ref)
}

focusOnItem = (id) => {
    this.itemRef.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRef[id].classList.add('char__item_selected');
    this.itemRef[id].focus()
}

renderItem(arr) {
    const items =  arr.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
        
        return (
            <li className="char__item"
                ref={this.setRef}
                tabIndex={0}
                key={item.id}
                onClick={() => {
                    this.props.onSelectedChar(item.id);
                    this.focusOnItem(i)
                    }}
                onKeyPress={(e) => {
                    if(e.key === ' ' || e.key === 'Enter'){
                        this.props.onSelectedChar(item.id);
                        this.focusOnItem(i)
                    }
                }}>
                
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
            </li>
        )
    });
    
    return (
        <ul className="char__grid">
            {items}
        </ul>
    )
}

    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItem(charList);

        const spinner = loading ? <Spinner/> : null;
        const errorMassege = error ? <ErrorMassege/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMassege}
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : charEnded ? 'none' : 'block'}}
                    onClick={() => this.onReguest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;