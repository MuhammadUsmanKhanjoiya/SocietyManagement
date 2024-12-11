import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { collection, query, where, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Dashboard() {
  const [stats, setStats] = useState({
    totalResidents: 0,
    pendingPayments: 0,
    openComplaints: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const residentsCount = await getCountFromServer(collection(db, 'residents'));
      const paymentsQuery = query(collection(db, 'payments'), where('status', '==', 'pending'));
      const paymentsCount = await getCountFromServer(paymentsQuery);
      const complaintsQuery = query(collection(db, 'complaints'), where('status', '==', 'open'));
      const complaintsCount = await getCountFromServer(complaintsQuery);
      const eventsQuery = query(collection(db, 'events'), where('date', '>=', new Date()));
      const eventsCount = await getCountFromServer(eventsQuery);

      setStats({
        totalResidents: residentsCount.data().count,
        pendingPayments: paymentsCount.data().count,
        openComplaints: complaintsCount.data().count,
        upcomingEvents: eventsCount.data().count,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="site-card-wrapper">
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Residents"
              value={stats.totalResidents}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={stats.pendingPayments}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Open Complaints"
              value={stats.openComplaints}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Upcoming Events"
              value={stats.upcomingEvents}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;

