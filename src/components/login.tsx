import React, { useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';


const Login = () => {
    const [value, setValue] = useState('');
    const header = (
      <img alt="Card" className='bg-blue-400 border-round-top-xl p-4' src="https://www.qoop.ai/assets/qoop-logo-DiXdMchp.png" />
    );

    const footer = (
        <>
        <div className='flex justify-content-end'>
            <Button label="LogIn" icon="pi pi-check" />
            <Button label="Register" severity="secondary" icon="pi pi-user" style={{ marginLeft: '0.5em' }} />
        </div>
        </>
    );

    return (
        <div className="card flex justify-content-center align-content-center mt-5">
            <Card title="Qoop Ai" subTitle="Register as a new user...!" footer={footer} header={header} className="w-25rem text-center">
            <div className="card flex flex-column">
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Username" />
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"></i>
                    </span>
                    <Password placeholder='Password' value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
            </div>
            </Card>
        </div>
    )

}

export default Login