import styled from '@emotion/styled';
import NavigationBar from '@/components/common/NavigationBar';
import FriendSelectSection from '@/components/home/FriendSelectSection';
import BannerSection from '@/components/home/BannerSection';
import ThemeSection from '@/components/home/ThemeSection';
import RankingSection from '@/components/home/RankingSection';
import LoginPage from '@/pages/loginpage';
import MyPage from '@/pages/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OrderPage from '@/pages/OrderPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <AppInner>
            <NavigationBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <FriendSelectSection />
                    <ThemeSection />
                    <BannerSection />
                    <RankingSection />
                  </>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/my"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppInner>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  min-height: 100vh;
`;

const AppInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray00};
  min-height: 100vh;
`;
