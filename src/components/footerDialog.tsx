import { Button } from "primereact/button"

const FooterDialog = () => {
    return(
        <>
        <div className='flex justify-content-end'>
            <Button label="Continue" icon="pi pi-check" type='submit'/>
            <Button label="Cancel" severity="danger" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </div>
        </>
    )
}

export default FooterDialog