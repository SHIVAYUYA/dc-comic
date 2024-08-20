import './index.css'
import { useState} from 'react';

export const RegistForm = function () {
    // 変数宣言
  const [bookName,setBookName] = useState('');
  const [startNumber,setStartNumber] = useState('');
  const [finishNumber,setFinishNumber] = useState('');
  const [bookType,setBookType] = useState('');
  const [posts,setposts] = useState([]);
  console.log(posts);


  async function handlesubmit(e){

    e.preventDefault() // イベントに対するデフォルト動作の停止

    if (bookName === ''|| bookType === '' || startNumber === '' || finishNumber === ''){
      return
    }

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post`,
        {
          method: "POST", // post形式
          headers: {
            "Content-Type": "application/json", //　送信する形式
          },
          /*データの送信*/
          body: JSON.stringify({
            bookName,
            bookType,
            startNumber,
            finishNumber,
          }),
        }
      );
    
      if (response.ok) { // .okは読み取り専用プロパティでありステータスが200~299の間で成功したかどうかを表す。
        setposts([...posts, { bookName,bookType,startNumber,finishNumber, }]);
        // inputの中身をリセット
        setBookName("");
        setBookType(""); 
        setStartNumber("");
        setFinishNumber("");
        console.log("成功");
      } else {
        console.log("失敗");
      }
    } catch (error) {
      console.error(error);
    }
  }

    
    return <div className="form_box">
              <div className="layout_box">
                <h2 className='formTitle'>書籍登録フォーム</h2>

                <form action="" className="useForm" onSubmit={handlesubmit}>
                    <div className="form-control-first">
                      <label className='formLabel' htmlFor="bookName">書籍名</label>
                      <input className='form-input' type="text" id='bookName' placeholder='書籍名を入力' value={bookName} onChange={function(e){setBookName(e.currentTarget.value)}} />
                    </div>

                    <div className="form-control-second">
                      <label className='formLabel' htmlFor="bookType">ジャンル</label>
                      <input className='form-input' type="text" id='bookType' value={bookType} onChange={function(e){setBookType(e.currentTarget.value)}} />
                    </div>

                    <div className="form-control-third">
                      <label className='formLabel' htmlFor="startNumber">登録巻数</label>
                      <div className="input-group">
                        <input type="text" id='startNumber' className='input__startNumber' value={startNumber} onChange={function(e){setStartNumber(e.currentTarget.value)}}/>
                        <input type="text" id='finishNumber' className='input__finishNumber'value={finishNumber} onChange={function(e){setFinishNumber(e.currentTarget.value)}}/>
                      </div>
                    </div>

                    <div className="form-control-forth">
                      <button className='registButton' type='submit'>記録</button>
                    </div>

                </form>
              </div>
            </div>
}