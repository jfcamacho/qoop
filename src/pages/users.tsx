import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { User } from '../models/User.model';
import { Button } from 'primereact/button';
import axios from 'axios';
import Config from '../config/config';


export default function Users() {
    const toast = useRef<Toast>(null);
    const userData = {
        id: 0,
        username: "",
        name: "",
        email: "",
        password: ""
    }

    const [formData, setFormData] = useState<User>({
        ...userData
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
        try {
            const usuarioId = formData.id; // ID del usuario a actualizar
            const response = await axios.put(`${Config.API_URL}/users/${usuarioId}`, formData);
            if(response.statusText === 'OK'){
                toast.current?.show({severity:'success', summary: 'Success', detail:'The user has been updated', life: 3000});
                loadUsers()
            }
          } catch (error) {
            console.error('Error al actualizar el usuario:', error);
          }
      };

    // const confirm2 = () => {
    //     confirmDialog({
    //         message: 'Yoour User will be added...!',
    //         header: 'Info',
    //         icon: 'pi pi-info-circle',
    //         defaultFocus: 'reject',
    //         acceptClassName: 'p-button-danger',
    //         acceptLabel: 'Ok'
    //     });
    // };
    const headerC = (
        <div className='flex justify-content-center w-full p-3'>
            <img alt="Card" src="/images/Contract.png" className='w-12rem'/>
        </div>
    );

    const [users, setUser] = useState<User[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

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
    

    useEffect(() => {
        loadUsers()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data: User[]) => {
        return [...(data || [])].map((d) => {
            // @ts-ignore
            // d.date = new Date(d.date);

            return d;
        });
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <span className="text-xl text-900 font-bold">Users</span>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    const formDataHandler = (data: User) => {
        setFormData({
            ...formData,
            ...data,
        });
    };

    const actionsHandler = (rowData: User) => {
        return (
            <>
                <Button icon="pi pi-pencil" text severity="success" onClick={() => formDataHandler(rowData)} autoFocus />
                <Button icon="pi pi-trash" text severity="danger" autoFocus />
            </>
        )
    }

    const FooterDialog = () => {
        return(
            <>
            <div className='flex justify-content-end'>
                <Button label="Continue" icon="pi pi-check" type='submit'/>
                <Button label="Cancel" severity="danger" icon="pi pi-times" type='button' onClick={() => setFormData({...userData})} style={{ marginLeft: '0.5em' }} />
            </div>
            </>
        )
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className='grid'>
                <div className='col-3'>
                    <div className='card'>
                        <div className="card flex justify-content-center">
                            <form onSubmit={handleSubmit}>
                                <Card title="Manage Users" subTitle="Create, Read, Update and Delete users" footer={FooterDialog} header={headerC} className="md:w-25rem">
                                    <p className="m-0">
                                        This is the space where you can manage your users
                                    </p>
                                        <Toast ref={toast} />
                                        <ConfirmDialog />
                                        <div className="flex flex-column gap-3 mt-3">
                                            <div className="p-inputgroup flex-1">
                                                <InputText placeholder="Name" name='name' type='text' value={formData.name} onChange={handleChange}/>
                                            </div>
                                            <div className="p-inputgroup flex-1">
                                                <InputText placeholder="Username" name='username' value={formData.username} onChange={handleChange}/>
                                            </div>
                                            <div className="p-inputgroup flex-1">
                                                <InputText placeholder="Email" name='email' type='email' value={formData.email} onChange={handleChange}/>
                                            </div>
                                            <div className="p-inputgroup flex-1">
                                                <InputText placeholder="Password" name='password' type='password' value={formData.password} onChange={handleChange}/>
                                            </div>
                                        </div>
                                </Card>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-9 text-center'>
                    <DataTable value={users} paginator rows={10} dataKey="id" loading={loading} filters={filters}
                            globalFilterFields={['name', 'username', 'email']} header={header} emptyMessage="No customers found.">
                        <Column field="name" header="Name" style={{ minWidth: '12rem' }} />
                        <Column field="username" header="Username" style={{ minWidth: '12rem'}}  />
                        <Column field="email" header="Email" style={{ minWidth: '12rem'}}  />
                        <Column header="Actions" alignHeader={'center'} style={{ minWidth: '12rem', textAlign: 'center'}}  body={actionsHandler}/>
                        
                        {/* <Column header="Users" filterField="users" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                            body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                        <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} /> */}
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
         