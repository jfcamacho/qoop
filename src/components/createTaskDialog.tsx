import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Project } from '../models/Project.model';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Task } from "../models/Task.model";
import { User } from "../models/User.model";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import Config from "../config/config";
// Define los tipos de las funciones
export type ChildFunctions = {
    setVisible: (value: boolean) => void;
    setNewProject: (info: Project) => void;
  };
  
  // Define los tipos de las props del componente hijo
  interface ChildComponentProps {
    registerFunctions: (functions: ChildFunctions) => void;
  }

const CreateTaskDialog: React.FC<ChildComponentProps> = ({ registerFunctions }) => {

    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState(false);
    const [users, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedUser, setSelectedUser] = useState<User>({
        id: 0,
        username: "",
        name: ""
    });

    const loadUsers = async () => {
        axios.get(`${Config.API_URL}/users/me`, {
            withCredentials: true,  // Esto también asegura que las cookies se envíen
          })
          .then((response: any) => {
            setUser(getCustomers(response.data));
            setLoading(false);
          })
          .catch(error => console.error('Error:', error));
    }

    const getCustomers = (data: User[]) => {
        return [...(data || [])].map((d) => {
            // @ts-ignore
            // d.date = new Date(d.date);

            return d;
        });
    };

    const [newProjet, setNewProject] = useState<Project>({
        title: '',
        description: '',
        id: 0
    })

    const [task, setTask] = useState<Task>({
        title: '',
        description: '',
        owner_id: 0
    })

    useEffect(() => {
        loadUsers()
        registerFunctions({ setVisible, setNewProject });
      }, [registerFunctions]);

    const saveTaskHandler = () => {
        if (selectedUser){
            task.owner_id = selectedUser.id
        }
        toast.current?.show({ severity: 'success', summary: 'Confirmed', detail: 'Your task was added', life: 3000 });
        console.log(task);
    }

    const footerContent = (
        <div>
            <Button label="Save" icon="pi pi-check" severity="success" onClick={() => saveTaskHandler()} autoFocus />
            <Button label="Cancel" icon="pi pi-check" severity="danger" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTask({
            ...task,
            [name]: value,
        });
        };
        

    // const users: User[] = [
    //     { username: 'jfcamacho', email: 'jfcamacho@email.com' },
    //     { username: 'acbenitez', email: 'acbenitez@email.com' },
    //     { username: 'herrera', email: 'herrera@email.com' },
    //     { username: 'hernesto', email: 'hernesto@email.com' },
    // ];

    const tasks: Task[] = [
        { title: 'Create Topbar', description: 'Create the diferents parts in the topbar', user: {username: 'jfcamacho'} },
        { title: 'Create Sidebar', description: 'Create the menu in the side', user: {username: 'acbenitez'} },
        { title: 'Create footer', description: 'Create an image for the footer', user: {username: 'hernesto'} },
        { title: 'Create Topbar', description: 'Create the diferents parts in the topbar', user: {username: 'jfcamacho'} },
        { title: 'Create Sidebar', description: 'Create the menu in the side', user: {username: 'acbenitez'} },
        { title: 'Create footer', description: 'Create an image for the footer', user: {username: 'hernesto'} },
    ];

    const selectedCountryTemplate = (option: User, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.username}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    return (<>
        <Toast ref={toast} />
        <Dialog visible={visible} modal header={newProjet.title} footer={footerContent} style={{ width: '50rem' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className="grid">
                <div className="col-4">
                    <InputText placeholder="Title" name='title' value={task.title} onChange={handleChange}/>
                </div>
                <div className="col-8">
                    <InputText className="w-full" placeholder="Descripton" name='description' value={task.description} onChange={handleChange}/>
                </div>
                <div className="col-12">
                    <Dropdown value={selectedUser} onChange={(e) => setSelectedUser(e.value)} options={users} optionLabel="name" placeholder="Select a user" 
                    filter valueTemplate={selectedCountryTemplate} className="w-full" />
                </div>
                <div className="col-12">
                    <div className="card">
                        <DataTable value={tasks} scrollable scrollHeight="200px">
                            <Column field="title" header="Title"></Column>
                            <Column field="description" header="Description"></Column>
                            <Column field="user.username" header="User"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </Dialog>
        </>
        )
    
}

export default CreateTaskDialog