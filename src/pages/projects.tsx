import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { CustomerService } from '../service/CustomerService';
import { Card } from 'primereact/card';
import { MeterGroup } from 'primereact/metergroup';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import FooterDialog from '../components/footerDialog';
import { Project } from '../models/Project.model';
import CreateTaskDialog, { ChildFunctions } from '../components/createTaskDialog';


export default function Projects() {
    const toast = useRef<Toast>(null);
    
    const [formData, setFormData] = useState<Project>({
        title: "",
        description: ""
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
            message: 'Yoour project will be added...!',
            header: 'Info',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Ok'
        });
    };
    const headerC = (
        <div className='flex justify-content-center w-full p-3'>
            <img alt="Card" src="/images/Project.png" className='w-18rem'/>
        </div>
    );

    const [project, setProject] = useState<Project[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tasks: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data: Project[]) => {
            setProject(getCustomers(data));
            setLoading(false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data: Project[]) => {
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
                <span className="text-xl text-900 font-bold">Projects</span>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText autoFocus value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const tasksBodyTemplate = (rowData: Project) => {
        return (
            <div className="flex align-items-center justify-content-center" style={{height: '20px'}}>
                <span className="text-black mr-5">{rowData.tasks}</span>
                <a style={{cursor: "pointer"}} onClick={() => newTaskHandler(rowData)}>
                    <i className="pi pi-file-plus" style={{color: "#708090"}}></i>
                </a>
            </div>
        )
    }

    const statusBodyTemplate = (rowData: Project) => {
        return <MeterGroup values={[{ label: 'Tasks completed', value: rowData.status, color: '#34d399'}]} />;
    };

    const header = renderHeader();

    const [childFunctions, setChildFunctions] = useState<ChildFunctions | null>(null);

    const newTaskHandler = (rowData: Project) =>{
        childFunctions?.setNewProject(rowData)
        childFunctions?.setVisible(true)
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className='grid'>
                <div className='col-3'>
                    <div className='card'>
                        <div className="card flex justify-content-center">
                            <Card title="Insert a new Project" subTitle="Create a new project and detail it" footer={FooterDialog} header={headerC} className="md:w-25rem">
                                <p className="m-0">
                                    This is the space where you can detail each new project and associate the corresponding users
                                </p>
                                    <Toast ref={toast} />
                                    <ConfirmDialog />
                                    <form onSubmit={handleSubmit}>
                                    <div className="flex flex-column gap-3 mt-3">
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Title" name='title' value={formData.title} onChange={handleChange}/>
                                        </div>
                                        <div className="p-inputgroup flex-1">
                                            <InputText placeholder="Description" name='description' value={formData.description} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    </form>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className='col-9 text-center'>
                    <DataTable value={project} paginator rows={10} dataKey="id" filters={filters} loading={loading}
                            globalFilterFields={['title', 'description', 'tasks', 'status']} header={header} emptyMessage="No customers found.">
                        <Column field="title" header="Title" style={{ minWidth: '12rem' }} />
                        <Column field="description" header="Description" style={{ minWidth: '12rem'}}  />
                        <Column header="Tasks" alignHeader={'center'} style={{ minWidth: '12rem'}}  body={tasksBodyTemplate}/>
                        <Column header="Status" 
                        body={statusBodyTemplate}
                        style={{ minWidth: '12rem' }}  
                        />
                        {/* <Column header="Users" filterField="users" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                            body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                        <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} /> */}
                    </DataTable>
                </div>
            </div>
            <CreateTaskDialog registerFunctions={setChildFunctions}/>
        </div>
    );
}
         