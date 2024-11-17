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


export default function Tasks() {
    const toast = useRef<Toast>(null);
    
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
                <span className="text-xl text-900 font-bold">Tasks</span>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText autoFocus value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    const actionsHandler = (rowData: User) => {
        return (
            <>
                <Button icon="pi pi-trash" text severity="danger" />
            </>
        )
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className='grid'>
                <div className='col-12 text-center'>
                    <DataTable value={users} paginator rows={10} dataKey="id" loading={loading} filters={filters} filterDisplay="row"
                            globalFilterFields={['name', 'username', 'email']} header={header} emptyMessage="No customers found.">
                        <Column field="name" header="Project" filter filterPlaceholder="Search by project name" style={{ minWidth: '12rem' }} />
                        <Column field="username" header="Task" filter filterPlaceholder="Search by task name" style={{ minWidth: '12rem'}}  />
                        <Column field="email" header="User" filter filterPlaceholder="Search by user name" style={{ minWidth: '12rem'}}  />
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
         