import './App.css';
import {RegistForm} from './pages/regist';
import { Header } from './components/header';
import {Route, BrowserRouter, NavLink, Outlet, Routes} from 'react-router-dom';
import { List } from './pages/list';

const activeLink = ({isActive, isPending}) => isActive ? 'active' : 'activeLink';

function App() {

  return (
    <div className='App'>
      <Header />
      <main>
        <div className="main__inner">

          <div className="window__layout">
            
            <BrowserRouter>
              <nav className='window_nav'>
                <ul>
                  <li><div><NavLink className={activeLink} to="/list">書籍一覧</NavLink></div></li>
                  <li><div><NavLink className={activeLink} to="/regist">書籍登録</NavLink></div></li>
                  {/* <li><div><NavLink to="/serch">書籍検索</NavLink></div></li> */}
                </ul>
              </nav>

              <Routes>
                <Route path="/list" element={<List />} />
                <Route path="/regist" element={<RegistForm />} />
                <Route path="*" element={<h1>Not Found Page</h1>} />
              </Routes>
            </BrowserRouter>

            <Outlet />
          </div>
        </div>
      </main >
    </div>
  )
}

export default App
