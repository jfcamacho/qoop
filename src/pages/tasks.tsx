import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import axios from 'axios';
import Config from '../config/config';
import { Task } from '../models/Task.model';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { useGlobalContext } from '../config/GlobalContext';


export default function Tasks() {
    const toast = useRef<Toast>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [tasks, setTask] = useState<Task[]>([]);
    const {isSubscribed } = useGlobalContext();
    
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'project.title': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'user.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    

    useEffect(() => {
        loadTasks()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadTasks = async () => {
        await axios.get(`${Config.API_URL}/tasks`, {
            withCredentials: true
        })
        .then( (response: any) => {
            setTask(getTasks(response.data))
            setLoading(false)
        })
    }

    const getTasks = (data: Task[]) => {
        return [...(data || [])].map((d) => {
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

    const confirm = async (rowData: Task, severity: boolean) => {
        rowData.completed = 1
        if(severity){
            await axios.put(`${Config.API_URL}/tasks/${rowData.id}`, rowData, {
                withCredentials: true
            })
            .then( () => {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Your progress has been updated', life: 3000 });
                loadTasks()
            }).catch(() => {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your progress hasn\'t been updated', life: 3000 });
            })
        }else{
            confirmDialog({
                message: 'You are going to delete a task, are you sure?...!',
                header: 'Warning',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-success',
                rejectLabel: 'Cancel',
                acceptLabel: 'Yes. Continue',
                accept: async () => {
                    await axios.delete(`${Config.API_URL}/tasks/${rowData.id}`, {
                        withCredentials: true
                    })
                    .then( () => {
                        toast.current?.show({ severity: 'warn', summary: 'Success', detail: 'Your task has been deleted', life: 3000 });
                        loadTasks()
                    }).catch(() => {
                        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your progress hasn\'t been updated', life: 3000 });
                    })
                }
            });
        }
    }

    const actionsHandler = (rowData: Task) => {
        return (
            <>
                {rowData.completed == 0 ?<Button icon="pi pi-circle" type='button' onClick={() => confirm(rowData, true)} text severity="warning" /> :
                <Button icon="pi pi-circle-fill" type='button' text severity="success" />}
                <Button icon="pi pi-trash" type='button' onClick={() => confirm(rowData, false)} text severity="danger" disabled={!isSubscribed}/>
            </>
        )
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className='grid'>
                <div className='col-12 text-center'>
                    <DataTable value={tasks} paginator rows={10} dataKey="id" loading={loading} filters={filters} filterDisplay="row"
                            globalFilterFields={['project.title', 'title', 'description', 'user.name']} header={header} emptyMessage="No customers found.">
                        <Column field="project.title" header="Project" filter filterPlaceholder="Search by project name" style={{ minWidth: '12rem' }} />
                        <Column field="title" header="Title" filter filterPlaceholder="Search by task name" style={{ minWidth: '12rem'}}  />
                        <Column field="description" header="Description" filter filterPlaceholder="Search by user name" style={{ minWidth: '12rem'}}  />
                        <Column field="user.name" header="User" filter filterPlaceholder="Search by user name" style={{ minWidth: '12rem'}}  />
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
         