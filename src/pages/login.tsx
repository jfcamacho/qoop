import React, { useRef, useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useGlobalContext } from '../config/GlobalContext';
import axios from 'axios';
import Config from '../config/config';

interface FormData {
    username: string;
    password: string;
  }


const Login = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { isSubscribed, setGlobalState } = useGlobalContext();
    
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
      });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const params = new URLSearchParams();
        params.append("username", formData.username);
        params.append("password", formData.password);

        event.preventDefault(); // Evita la recarga de la página
            try {
                axios.post(`${Config.API_URL}/token`, params.toString(), {
                    withCredentials: true,  // Esto también asegura que las cookies se envíen
                  })
                  .then(async (response: any) => {
                    setGlobalState("user", {...response.data.user})
                    setGlobalState("isSubscribed", false)
                    await axios.get(`${Config.API_URL}/subscriptions/${response.data.user.id}`, {
                        withCredentials: true
                    }).then( (response: any) => {
                        if((new Date(response.data.end_date)).getTime() >= (new Date()).getTime()){
                            setGlobalState("isSubscribed", true)
                        }else{
                            toast.current?.show({severity:'error', summary: 'Error', detail:'The process faild', life: 3000});
                        }
                    }).catch(() => {
                        setGlobalState("isSubscribed", false)
                    })
                    .finally( () => {
                        navigate('/Home')
                    })
                  })
                  .catch(error => console.error('Error:', error));
            } catch (error) {
                console.error("Error logging in:", error);
                console.log(isSubscribed);
                confirm2()
            }
            setFormData({
                ...formData,
                ['username']: '',
                ['password']: ''
            })
        // Aquí puedes hacer un fetch o axios para enviar los datos al backend
      };

    const confirm2 = () => {
        confirmDialog({
            message: 'Your user or password it\'s incorrect...!',
            header: 'Error',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            rejectClassName: 'hidden',
            acceptLabel: 'Ok'
        });
    };

    const header = (
      <img alt="Card" className='bg-blue-700 border-round-top-xl p-4' src="/images/qoop-logo-DiXdMchp.png" />
    );

    const footer = (
        <>
        <div className='flex justify-content-end'>
            <Button label="LogIn" icon="pi pi-check" type='submit'/>
            <Button label="Register" severity="secondary" onClick={() => navigate('/register')} icon="pi pi-user" style={{ marginLeft: '0.5em' }} />
        </div>
        </>
    );

    return (
        <div className="flex flex-wrap align-items-center justify-content-center w-full" style={{height: '95vh'}}>
            <Toast ref={toast} />
            <ConfirmDialog />
            <form onSubmit={handleSubmit}>
            <Card title="Project Management Platform" subTitle="Login if you are already registered." footer={footer} header={header} className="w-25rem text-center">
            <div className="card flex flex-column">
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Username" name='username' value={formData.username} onChange={handleChange}/>
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"></i>
                    </span>
                    <Password placeholder='Password' name='password' value={formData.password} feedback={false} onChange={handleChange} />
                </div>
            </div>
            </Card>
            </form>
        </div>
    )

}

export default Login