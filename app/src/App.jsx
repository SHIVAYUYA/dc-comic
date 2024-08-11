import './App.css'
import { useEffect, useState } from 'react';
import { Header } from './components/header'
import { BooksPool } from './components/booksPool';

function App() {

  // 変数宣言
  const [bookName,setBookName] = useState('');
  const [startNumber,setStartNumber] = useState('');
  const [finishNumber,setFinishNumber] = useState('');
  const [posts,setposts] = useState([]);
  console.log(posts);


  async function handlesubmit(e){

    e.preventDefault() // イベントに対するデフォルト動作の停止

    if (bookName === ''|| startNumber === '' || finishNumber === ''){
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
          /*
          　データの送信
          */
          body: JSON.stringify({
            bookName,
            startNumber,
            finishNumber,
          }),
        }
      );
    
      if (response.ok) { // .okは読み取り専用プロパティでありステータスが200~299の間で成功したかどうかを表す。
        setposts([...posts, { bookName,startNumber,finishNumber, }]);
        // inputの中身をリセット
        setBookName(""); 
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


    // Q_TODO ここのExpressの動きがわからない　Answer:viteApiUrlにデータを置きそれをここでimportしてfetchで全て読み取っている
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          // Viteが公開している特別な環境変数-今回はViteに.envファイルを読み込ませている
          `${import.meta.env.VITE_API_URL}/api/post`
        );
        if (response.ok) { // VITE_API_URLに情報があるかの判断
          const { posts } = await response.json();
          setposts(posts);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

  // 上記の関数を使ってレンダリング
  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div className='App'>
      <Header />
      <main>
        <div className="main__inner">

          <div className="window__layout">
            <nav className='window_nav'>
              <ul>
                <li><div>書籍一覧</div></li>
                <li><div>書籍登録</div></li>
                <li><div>書籍検索</div></li>
              </ul>
            </nav>
            
            <div className="content_box">
              <div className="table_box">
                {/* ここには書籍のリストを表示 */}
                <table border={1}>
                  <thead className='thTitle'>
                    <tr>
                      <th className='table_title_title'>タイトル</th><th className='table_title_type'>ジャンル</th><th className='table_title_startNumber'>始巻</th><th className='table_title_finishNumber'>終巻</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 ? posts.map(function(post,i){
                      return <BooksPool bookName={post.bookName} startNumber={post.startNumber} finishNumber={post.finishNumber} key={i}/>
                    }) :<tr><td>登録書籍がありません</td></tr>}
                  </tbody> 
                </table>
              </div>
            </div>
          </div>

          {/* 登録フォーム */}
          {/* <div className="form_box">
            <h2 className='formTitle'>登録フォーム</h2>

            <form action="" className="useForm" onSubmit={handlesubmit}>
              <div className="form-control-first">
                <label htmlFor="bookName">書籍名</label>
                <input type="text" id='bookName' placeholder='書籍名を入力' value={bookName} onChange={function(e){setBookName(e.currentTarget.value)}} />
              </div>

              <div className="form-control-second">
                <label htmlFor="startNumber">登録巻数</label>
                <input type="text" id='startNumber' className='input__startNumber' value={startNumber} onChange={function(e){setStartNumber(e.currentTarget.value)}}/>
                <input type="text" id='finishNumber' className='input__finishNumber'value={finishNumber} onChange={function(e){setFinishNumber(e.currentTarget.value)}}/>
              </div>

              <div className="form-control-third">
                <button type='submit'>記録</button>
              </div>

            </form>
          </div> */}
        </div>
      </main >
    </div>
  )
}

export default App
