import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ResidentManagement from './pages/ResidentManagement.js';
import PaymentManagement from './pages/PaymentManagement';
import ComplaintManagement from './pages/ComplaintManagement';
import EventManagement from './pages/EventManagement';
import Login from './pages/Login';

const { Content } = Layout;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {user ? (
          <>
            <Sidebar />
            <Layout className="site-layout">
              <Content style={{ margin: '0 16px' }}>
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/residents" component={ResidentManagement} />
                  <Route path="/payments" component={PaymentManagement} />
                  <Route path="/complaints" component={ComplaintManagement} />
                  <Route path="/events" component={EventManagement} />
                </Switch>
              </Content>
            </Layout>
          </>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
      </Layout>
    </Router>
  );
}

export default App;
