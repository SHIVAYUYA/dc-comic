const mysqlConnection = require('../lib/db');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* api/postに以下のデータを送信 */
router.post('/api/post',async function(req, res, next) {
  
  console.log(req.body);
  const bookName = req.body.bookName;
  const startNumber = req.body.startNumber;
  const finishNumber = req.body.finishNumber;

  if (!bookName || !startNumber || !finishNumber) {
    res.status(400).json({message: "データが不足しています"})
    return
  }

  let connection = await mysqlConnection()

  try {
    const query =
      "insert into library (book_name, book_start_number, book_finish_number) values (?, ?, ?)"; // SQLの基本、後から値を指定できるインジェクション対策にもなる
    // SQL実行
    await connection.execute(query, [bookName, startNumber, finishNumber]);
    res.status(200).json({message: "success"})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy() // 接続を切る finaryで指定することで失敗しても成功しても接続を切ることが可能。
  }

});


router.get('/api/post', async (req, res, next) => {
  let connection = await mysqlConnection()
  try {

    // sql文
    const query =
      "select book_id, book_name, book_start_number, book_finish_number, book_at from library";
    // SQL実行
    const [result] = await connection.execute(query);

    // map関数を使用しresult配列の中身をpostsのpostIDなどに振り分け
    const posts = result.map(post => ({
      bookId: post.post_id,
      bookName: post.book_name,
      startNumber: post.book_start_number,
      finishNumber: post.book_finish_number,
      bookAt: post.book_at
    }))
    res.status(200).json({posts: posts})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy() // 接続を切る
  }
})

module.exports = router;
