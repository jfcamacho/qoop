import { Toolbar } from 'primereact/toolbar';
import React from 'react';
import { Badge } from 'primereact/badge';
import { MegaMenu } from 'primereact/megamenu';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuItem } from 'primereact/menuitem';

const Home = () => { 
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => {
                navigate('./users')
            }
        },
        {
            label: 'Projects',
            icon: 'pi pi-building',
            command: () => {
                navigate('./projects')
            }
        },
        {
            label: 'Tasks',
            icon: 'pi pi-file',
            command: () => {
                navigate('./tasks')
            }
        },
        {
            label: 'Subscriptions',
            icon: 'pi pi-share-alt',
            command: () => {
                navigate('./subscriptions')
            }
        }
    ];
    const startContent = (
        <React.Fragment>
      <img alt="Card" className='border-round-xl w-10rem' src="/images/qoop-logo-DiXdMchp.png" />
        </React.Fragment>
    );

    const handlerLogOut = () => {
        navigate('/')
    }

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
                {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
                <span className="text-white" style={{fontSize: '1.3rem'}}>Jefferson Camacho</span>
                {10 > 2 ? <Badge value="Active" severity="success"></Badge> : <Badge value="Expired" severity="danger"></Badge>}
            <button onClick={handlerLogOut} className="p-link inline-flex justify-content-center align-items-center text-black h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-power-off" style={{ fontSize: '1.2rem', color: 'white'}}></i>
            </button>
            </div>
        </React.Fragment>
    );

    return (
        <div className="">
            <Toolbar start={startContent} end={endContent} className='bg-blue-700'/>
            <div className='grid mt-2'>
                <div className='col-2' style={{fontSize: '14px'}}>
                    <MegaMenu model={items} orientation="vertical" breakpoint="960px"  className='w-full'/>
                </div>
                <div className='col-10'>
                    <div className="layout-main-container">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home