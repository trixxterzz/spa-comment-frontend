
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useStore from "../../store";
import addAlert from "../../utils/addAlert";


export default function RegisterConfirmation(){
    const { token } = useParams();
    const navigate = useNavigate();
    const { registrationConfirm } = useStore();

    const tryToConfirm = async () => {
        await registrationConfirm({ token });
        addAlert('Successfully confirmed user');
    }

    useEffect(() => {
        tryToConfirm();
        navigate('/');
    }, []);
}