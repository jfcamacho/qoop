import React, { useRef, useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { User } from '../models/User.model';


const Register = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    
    const [formData, setFormData] = useState<User>({
        username: "",
        password: "",
        email: "",
      });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita la recarga de la página
        if(formData.password !== formData.repeatPassword){
            toast.current?.show({severity:'error', summary: 'Error', detail:'The password must be equals', life: 3000});
        }else{
            try {
                formData.subscribed = false
                const response = await fetch("http://127.0.0.1:8000/users", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                  credentials: "include", // Importante para enviar cookies
                });
          
                if (response.ok) {
                    toast.current?.show({severity:'success', summary: 'Success', detail:'Your user has been registered', life: 3000});
                    confirm2()
                } else {
                  console.log("Invalid credentials");
                }
              } catch (error) {
                console.error("Error logging in:", error);
                console.log("Error during register");
              }
            // navigate('/')
        }
        // Aquí puedes hacer un fetch o axios para enviar los datos al backend
      };

    const confirm2 = () => {
        confirmDialog({
            message: 'Your user has been registered...!',
            header: 'Success',
            icon: 'pi pi-user',
            defaultFocus: 'accept',
            acceptClassName: 'p-button-success',
            rejectClassName: 'hidden',
            acceptLabel: 'Ok',
            accept: () => {
                navigate('/')
            }
        });
    };

    const header = (
      <img alt="Card" className='bg-blue-700 border-round-top-xl p-4' src="/images/qoop-logo-DiXdMchp.png" />
    );

    const footer = (
        <>
        <div className='flex justify-content-end'>
            <Button label="Cancel" severity='danger' icon="pi pi-undo" onClick={() => navigate('/')}/>
            <Button label="Register" severity="secondary" icon="pi pi-user" style={{ marginLeft: '0.5em' }} />
        </div>
        </>
    );

    return (
        <div className="flex flex-wrap align-items-center justify-content-center w-full" style={{height: '95vh'}}>
            <Toast ref={toast} />
            <ConfirmDialog />
            <form onSubmit={handleSubmit}>
            <Card title="Project Management Platform" subTitle="Register as a new user...!" footer={footer} header={header} className="w-25rem text-center">
            <div className="card flex flex-column">
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-id-card"></i>
                    </span>
                    <InputText placeholder="Name" name='name' value={formData.name} onChange={handleChange}/>
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Username" name='username' value={formData.username} onChange={handleChange}/>
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-envelope"></i>
                    </span>
                    <InputText placeholder="Email" name='email' value={formData.email} onChange={handleChange}/>
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"></i>
                    </span>
                    <Password placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
                </div>
                <div className="p-inputgroup flex-1 m-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"></i>
                    </span>
                    <Password placeholder='Repeat Password' name='repeatPassword' value={formData.repeatPassword} onChange={handleChange} />
                </div>
            </div>
            </Card>
            </form>
        </div>
    )

}

export default Register