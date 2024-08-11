import './index.css'

export const BooksPool = function (props) {
    console.log(props);
    return <tr>
                <td>書籍名:{props.bookName}</td>
                <td>始巻:{props.startNumber}</td>
                <td>終巻:{props.finishNumber}</td>
            </tr>
}