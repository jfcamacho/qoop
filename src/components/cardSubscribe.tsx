import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import axios from 'axios';
import Config from '../config/config';
import { useGlobalContext } from '../config/GlobalContext';
import { useEffect, useRef, useState } from 'react';
import { Subscription } from '../models/Subscription.model';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';

const CardSubscribe: React.FC<{ aFocus: boolean, options: any, sOptions: any }> = ({aFocus, options, sOptions}) => {
    const toast = useRef<Toast>(null);
    const { user, setGlobalState } = useGlobalContext();
    const [subscription, setSubscription] = useState<Subscription>({
        id: 0,
        start_date:  new Date(),
        end_date: new Date(),
        paid: false,
        user_id: 0,
    })

    const header = (
        <div className='flex justify-content-center w-full p-3'>
            <img alt="Card" src={sOptions.image} className='w-12rem h-15rem'/>
        </div>
    );
    const footer = (
        <div className='flex justify-content-between'>
            {/* <Button label="Renew" severity="warning" visible={sOptions.status} autoFocus={aFocus} onClick={() => updateSubscriptionHandler()} icon="pi pi-check" style={{ marginLeft: '0.5em' }} /> */}
            <Button label="Subscribe" severity="success" onClick={() => subscribeHandler()} icon="pi pi-check" style={{ marginLeft: '0.5em' }} />
        </div>
    );
    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <i className={option.icon}></i>
                <div className='ml-3'>{option.name}</div>
            </div>
        );
    };

    const subscribeHandler = async () => {
        console.log(subscription);
        await axios.post(`${Config.API_URL}/subscriptions/${user.id}`, subscription, {
            withCredentials: true
        })
        .then(async (response: any) => {
            console.log(response.data);
            if(response.statusText == "OK"){
                await axios.get(`${Config.API_URL}/subscriptions/${user.id}`, {
                    withCredentials: true
                }).then( (response: any) => {
                    if((new Date(response.data.end_date)).getTime() >= (new Date()).getTime()){
                        setGlobalState("isSubscribed", true)
                        toast.current?.show({severity:'success', summary: 'Success', detail:'Now you are subscribed', life: 3000});
                    }else{
                        toast.current?.show({severity:'error', summary: 'Error', detail:'The process faild', life: 3000});
                    }
                })
            }else{
                toast.current?.show({severity:'error', summary: 'Error', detail:'The process faild', life: 3000});
            }
        })
        .catch( error => {
            const idSubscription = Number(error.response.data.detail)
            setSubscription({...subscription, id: idSubscription})
            toast.current?.show({severity:'error', summary: 'Error', detail:`Subscription already exist`, life: 3000});
            sOptions.status = true
        });
    }

    useEffect( () => {
        let today = new Date()
        today.setDate(today.getDate() + sOptions.days)
        setSubscription({
            start_date: new Date(),
            end_date: today,
            paid: false,
            user_id: user.id,
        })
    }, [])

    // const updateSubscriptionHandler = async () => {
    //     let today = new Date()
    //     today.setDate(today.getDate() + sOptions.days)
    //     await axios.put(`${Config.API_URL}/subscriptions/${user.id}`, {...subscription, end_date: today}, {
    //         withCredentials: true,  // Esto también asegura que las cookies se envíen
    //         })
    //         .then( (response: any) => {
    //             if((new Date(response.data.end_date)).getTime() >= (new Date()).getTime()){
    //                 setGlobalState("user", {...user, subscribed: true})
    //                 toast.current?.show({severity:'success', summary: 'Success', detail:'Now you are subscribed', life: 3000});
    //             }else{
    //                 toast.current?.show({severity:'error', summary: 'Error', detail:'The process faild', life: 3000});
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // }

    return (
        <>
            <div className="card flex justify-content-center">
                <Toast ref={toast} />
                <ConfirmDialog/>
                <Card title={sOptions.title} subTitle={sOptions.subHeader} footer={footer} header={header} style={{maxWidth: "25rem"}}>
                    <ListBox options={options} optionLabel="name" className="w-full" itemTemplate={itemTemplate}/>
                </Card>
            </div>
        </>
    )
}

export default CardSubscribe