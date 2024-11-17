import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import axios from 'axios';
import Config from '../config/config';
import { useGlobalContext } from '../config/GlobalContext';

const CardSubscribe: React.FC<{ aFocus: boolean, options: any, sOptions: any }> = ({aFocus, options, sOptions}) => {
    const { user, setGlobalState } = useGlobalContext();

    const header = (
        <div className='flex justify-content-center w-full p-3'>
            <img alt="Card" src={sOptions.image} className='w-12rem h-15rem'/>
        </div>
    );
    const footer = (
        <div className='flex justify-content-end'>
            <Button label="Subscribe" severity="success" autoFocus={aFocus} onClick={() => subscribeHandler()} icon="pi pi-check" style={{ marginLeft: '0.5em' }} />
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
        await axios.put(`${Config.API_URL}/users/subscription/${user.id}`, {...user}, {
            withCredentials: true,  // Esto también asegura que las cookies se envíen
          })
          .then((response: any) => {
            setGlobalState("user", {...response.data})
          })
          .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <div className="card flex justify-content-center">
                <Card title={sOptions.title} subTitle={sOptions.subHeader} footer={footer} header={header} style={{maxWidth: "25rem"}}>
                    <ListBox options={options} optionLabel="name" className="w-full" itemTemplate={itemTemplate}/>
                </Card>
            </div>
        </>
    )
}

export default CardSubscribe