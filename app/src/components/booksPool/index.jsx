import './index.css'

export const BooksPool = function (props) {
    console.log(props);
    return  <div className="bookList__box">
                <div className='bookList'>

                    <h2 className='bookList__name'>{props.bookName}</h2>

                    <div className='bookList__content'>
                        <p className='bookList__content__text'>ジャンル:{props.bookType}</p>
                        <p className='bookList__content__number'>{props.startNumber} ~ {props.finishNumber}</p>
                    </div>
                </div>
            </div>
}