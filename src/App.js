import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import DiaryName from './components/register/DiaryName';
import UserName from './components/register/UserName';
import PassWord from './components/register/PassWord';
import HomePage from './components/home/HomePage';
import WritePage from './components/diary/WritePage';
import LoginPage from './components/login/LoginPage';
import EditPage from './components/diary/EditPage';
import ShowPage from './components/diary/ShowPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/diary-io" element={<DiaryName />} />
        <Route path="/diary-io/username" element={<UserName />} />
        <Route path="/diary-io/password" element={<PassWord />} />
        <Route path="/diary-io/login" element={<LoginPage />} />
        <Route path="/diary-io/home" element={<HomePage />} />
        <Route path="/diary-io/diary" element={<WritePage />} />
        <Route path="/diary-io/edit" element={<EditPage />} />
        <Route path="/diary-io/show" element={<ShowPage />} />
      </Routes>
    </div>
  );
}

export default App;
