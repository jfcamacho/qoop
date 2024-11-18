import { Card } from "primereact/card"
import CardSubscribe from "../components/cardSubscribe"
import { useEffect } from "react";

const aOptions = [
    { name: 'Manage 1 Projects' , icon:"pi pi-check"},
    { name: 'Manage 20 Tasks' , icon:"pi pi-check"},
    { name: 'Manage 5 Users', icon:"pi pi-check"},
    { name: "24x7 support", icon:"pi pi-times"},
    { name: "Dedicated support channel", icon:"pi pi-times"}
];
const sAoptions = { title: 'Free 7 days Subscription', days: 7, cost: '0', discount: '100%', subHeader:"Try our system free for 7 days, cancel whenever you want", image:"/images/SubscribeFreeRecurso.png", status: false}

const bOptions = [
    { name: 'Manage 50 Projects' , icon:"pi pi-check"},
    { name: 'Manage 1500 Tasks' , icon:"pi pi-check"},
    { name: 'Manage 100 Users' , icon:"pi pi-check"},
    { name: 'Support during business hours', icon:"pi pi-check"},
    { name: "Dedicated support channel", icon:"pi pi-times"}
];
const sBoptions = { title: 'Monthly Subscription', days: 30, cost: '20', discount: '0%', subHeader:"Work like a professional with a version that adapts to your work team", image:"/images/Subscribe.png", status: false}

const cOptions = [
    { name: 'Manage unlimited Projects' , icon:"pi pi-check"},
    { name: 'Manage unlimited Tasks' , icon:"pi pi-check"},
    { name: 'Manage unlimited Users' , icon:"pi pi-check"},
    { name: "24x7 support", icon:"pi pi-check"},
    { name: "Dedicated support channel", icon:"pi pi-check"}
];

const sCoptions = { title: 'Yearly Subscription', days: 365, cost: '180', discount: '25%', subHeader:"Use the full potential of your equipment and access our special discounts", image:"/images/SubscribeRecurso.png", status: false}


const SubscriptionPage = () => {
    useEffect(() => {
        sAoptions.status = false;
        sBoptions.status = false;
        sCoptions.status = false;
    }, [])
    return (
        <>
        <Card title="Subscriptions" autoFocus={true}>
            <p className="m-0">
                Choose from different types of subscriptions the one that best suits your needs, compare, select, subscribe and renew the way you manage your projects
            </p>
            <div className="flex justify-content-center mt-5 flex-wrap">
                <div className="m-3">
                    <CardSubscribe aFocus={false} options={aOptions} sOptions={sAoptions}/>
                </div>
                <div className="m-3">
                    <CardSubscribe aFocus={true} options={bOptions} sOptions={sBoptions}/>
                </div>
                <div className="m-3">
                    <CardSubscribe aFocus={false} options={cOptions} sOptions={sCoptions}/>
                </div>
            </div>
        </Card>
        </>
    )
}

export default SubscriptionPage