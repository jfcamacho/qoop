import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { UserServices } from '../service/userService';
import { Card } from 'primereact/card';
import { MeterGroup } from 'primereact/metergroup';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import FooterDialog from '../components/footerDialog';
import { User } from '../models/User.model';
import { Button } from 'primereact/button';


export default function Users() {
    const toast = useRef<Toast>(null);
    
    const [formData, setFormData] = useState<User>({
        username: "",
        name: "",
        email: "",
        password: ""
      });
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evita la recarga de la página
        // Aquí puedes hacer un fetch o axios para enviar los datos al backend
      };

    const confirm2 = () => {
        confirmDialog({
            message: 'Yoour User will be added...!',
            header: 'Info',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Ok'
        });
    };
    const headerC = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
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
    

    useEffect(() => {
        UserServices.getCustomersMedium().then((data: User[]) => {
            setUser(getCustomers(data));
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data: User[]) => {
        return [...(data || [])].map((d) => {
            // @ts-ignore
            d.date = new Date(d.date);

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

    const actionsHandler = (rowData: User) => {
        return (
            <>
                <Button icon="pi pi-pencil" text severity="success" onClick={() => setFormData(rowData)} autoFocus />
                <Button icon="pi pi-trash" text severity="danger" autoFocus />
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
                            <Card title="Manage Users" subTitle="Create, Read, Update and Delete users" footer={FooterDialog} header={headerC} className="md:w-25rem">
                                <p className="m-0">
                                    This is the space where you can manage your users
                                </p>
                                    <Toast ref={toast} />
                                    <ConfirmDialog />
                                    <form onSubmit={handleSubmit}>
                                    <div className="flex flex-column gap-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Title" name='Name' value={formData.name} onChange={handleChange}/>
                                        </div>
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Username" name='Username' value={formData.username} onChange={handleChange}/>
                                        </div>
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Email" name='Email' type='email' value={formData.email} onChange={handleChange}/>
                                        </div>
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Password" name='password' type='password' value={formData.password} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    </form>
                            </Card>
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
         