import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { Container, Tab, Tabs } from '@mui/material';

const pages = ['employees', 'categories', 'roles'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const  Dashboard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    const currentSegment = window.location.pathname.split('/')[1];
    setSelectedTab(currentSegment);
  }, []);

  const handleChangeTab = (tabName: string) => {
    setSelectedTab(tabName);
    navigate(`/${tabName}`);
  }

  return (
    <div>
        <AppBar position="static" className='!bg-primaryBlue'>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <img src={'/Byteridge-EMS-Logo.svg'} className="w-[10%] max-h-[80px] mr-10" />
                    <Tabs
                        value={selectedTab}
                        className='h-full'
                    >
                        {pages.map((item) => {
                            return (
                                <Tab
                                    label={item}
                                    onClick={() => handleChangeTab(item)}
                                    className={`${selectedTab === item ? 'selectedTab' : 'unselectedTab'} !font-bold !text-${selectedTab === item ? 'primaryBlue' : 'text'}`}
                                />
                            );
                        })}
                    </Tabs>
                </Toolbar>
            </Container>
        </AppBar>
        {children}
    </div>
  );
}
export default Dashboard;
