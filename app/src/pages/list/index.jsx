import './index.css'
import { BooksPool } from '../../components/booksPool';
import { useEffect, useState } from 'react';

export const List = function () {

    const [posts,setposts] = useState([]);

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

    return  <div className="bookList__layout">
              {/* ここには書籍のリストを表示 */}
                  {posts.length > 0 ? posts.map(function(post,i){
                    return <BooksPool bookName={post.bookName} bookType={post.bookType} startNumber={post.startNumber} finishNumber={post.finishNumber} key={i}/>
                  }) :<p>登録書籍がありません</p>}
            </div>
            
}