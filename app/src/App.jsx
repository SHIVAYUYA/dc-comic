import './App.css'
import { Header } from './components/header'

function App() {

  return (
      <div className='App'>
        <Header />
        <main>
          <div className="main__inner">
            <div className="content_box">
              {/* /* ここには書籍のリストを表示 */}
            </div>

            <div className="form_box">
              <form action="" className="useform">
                <div className="form-control">
                  <label htmlFor="bookName">書籍名</label>
                  <input type="text" id='bookName' placeholder='書籍名を入力' />
                </div>

                <div className="form-control">
                  <label htmlFor="bookNumber">登録巻数</label>
                  <input type="text" id='bookNumber' />
                  <input type="text" />
                </div>
              </form>
            </div>
          </div>
        </main >
      </div>
  )
}

export default App
