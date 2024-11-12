import { Button, Modal, Textarea, Label, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useStore from "../../store";
import Comment from "./Comment";
import { useState } from "react";
import addAlert from "../../utils/addAlert";
import * as Yup from 'yup';
import { useYupResolver } from "../../utils/useYupResolver";
import { io } from 'socket.io-client';
import resizeFile from "../../utils/resizeFile";
import CaptchaComponent from "../Captcha";

const validationSchema = Yup.object({
    text: Yup.string().required().max(288),
    parent_id: Yup.number().integer().optional(),
});

const socket = io(import.meta.env.VITE_SOCKET_ADDRESS);

export default function Comments() {
    const { comments, writeComment } = useStore();
    const [ openModal, setOpenModal ] = useState(false);
    const [ repliant, setRepliant ] = useState(null);
    const [ fileState, setFile ] = useState(null);
    const [ isValidCaptcha, setIsValidCaptcha ] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors = {}, isValid }, reset } = useForm({
        resolver: useYupResolver(validationSchema),
        mode: 'onBlur',
    });

    const callModal = (data = null) => {
        setRepliant(data);
        data && setValue('parent_id', data.id);
        setOpenModal(true);
    };

    const clearCommentData = (withFile = true) => {
        setOpenModal(false);
        if(fileState !== null && withFile) {
            socket.emit('deleteFile', {
               fileKey: fileState.key 
            });
        }
        setFile(null);
        setRepliant(null);
        reset();
        setIsValidCaptcha(false);
    };

    const submit = async (data) => {
        if (fileState != null) {
            await writeComment({ ...data, file: fileState})
        } else {
            await writeComment(data);
        }
        setOpenModal(false);
        clearCommentData(false);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }

        if(fileState) {
            socket.emit('deleteFile', {
               fileKey: fileState.key 
            });
        }

        const [type, format] = file.type.split('/');

        if (type === 'image') {
            const resized = await resizeFile(file, format);
            socket.emit('uploadFiles', { 
                file: resized,
                fileName: file.name,
                fileType: file.type 
            });
        } else {
            if (file.size > 100 * 1024) {
                addAlert('Maximum size of txt file is 100kb.');
                return;
            }
            socket.emit('uploadFiles', { 
                file: file,
                fileName: file.name,
                fileType: file.type 
            });
        }
        
        socket.on('uploadSuccess', (key) => {
            setFile({ key, type });
        });
        
        socket.on('uploadError', (error) => {
            addAlert(error?.message);
        });
    };

    return <>
        <div className="container">
            <Button className="bg-indigo-600 ml-80 my-6" onClick={() => callModal()}>Write comment</Button>
        </div>
        {comments.length > 0 ? comments.map((data) => <Comment data={data} key={data.id} callModal={callModal}/>) : <p className="text-indigo-600 py-20 text-3xl">No comments here so far...</p>}
        <Modal show={openModal} onClose={() => clearCommentData()}>
            <Modal.Header className="bg-indigo-600"> <p className="text-white">{repliant !== null ? `Reply to ${repliant?.author?.login}` : 'Write comment'} </p></Modal.Header>
            <form onSubmit={handleSubmit(submit)}>
            <Modal.Body>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your message" />
                    </div>
                    <Textarea {...register('text')} required rows={4}/>
                    <p className="text-red-600">{ errors?.text?.message ?? ''}</p>
                </div>
                <div id="fileUpload" className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Upload file" />
                    </div>
                    <FileInput id="file" onChange={handleFileChange} helperText=".png, .jpeg, .webp, .txt file" accept=".txt,.png,.jpeg,.webp,.jpg" />
                </div>
                <CaptchaComponent onValidate={(isValid) => setIsValidCaptcha(isValid)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => clearCommentData()} color='red'>Cancel</Button>
                <Button disabled={!(isValid && isValidCaptcha)} color='#4f46e5' type="submit"> Send </Button>
            </Modal.Footer>
            </form>
        </Modal>
    </>
}