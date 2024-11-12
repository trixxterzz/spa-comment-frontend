
import { Button } from 'flowbite-react';
import formatToLocalTime from '../../utils/formatLocaleTime';
import ModalImage from "react-modal-image";
import FileLink from '../FileLink';

export default function Comment({ data, parent_author, callModal }) {
    const { author, text, children, date, attachedFiles } = data;
    return <>
        <div className="container py-4 w-full max-w-full shrink">
            <div className="bg-indigo-600 h-14 rounded-t-lg flex">
                <p className="pl-3 pt-4 color text-stone-50 flex-initial">{`${author.login}  (${author.email}) ${parent_author ? `to ${parent_author.login}` : ''} at ${formatToLocalTime(date)}`}</p>
                <Button onClick={() => callModal(data)} className='flex-initial my-2 text-white' color='#4f46e5'> Reply </Button>
            </div>
            <div className="px-3 pt-4 bg-white border-x-2 border-indigo-600 min-h-20 break-words">
                {text}
            </div>
            <div className="pl-3 pt-4 pb-4 bg-white border-x-2 border-b-2 border-indigo-600 rounded-b-lg min-h-10">
                {attachedFiles.length > 0 && attachedFiles[0].type === 'image' && attachedFiles.map((file) => <ModalImage className='hover:border-indigo-600 hover:border-3' key={file.key} small={import.meta.env.VITE_S3_BUCKET + file.key} large={import.meta.env.VITE_S3_BUCKET + file.key}/>)}
                {attachedFiles.length > 0 && attachedFiles[0].type !== 'image' && attachedFiles.map((file) => <FileLink key={file.key} href={import.meta.env.VITE_S3_BUCKET + file.key} name={file.key}/>)}
            </div>
            <div className="container bg-neutral-100 grid grid-cols-12 rounded-b-lg">
                <div className="col-start-2 col-span-11">
                    {children?.length > 0 ? children.map((child) => <Comment key={child.id} data={child} parent_author={author} callModal={callModal} />) : null}
                </div>
            </div>
        </div>
    </>
}