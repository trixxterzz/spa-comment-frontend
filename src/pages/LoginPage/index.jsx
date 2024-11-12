//import addAlert from "../../utils/addAlert";
import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useYupResolver } from '../../utils/useYupResolver';
import useStore from '../../store';
import addAlert from '../../utils/addAlert';
//import { setCookies } from '../../utils/cookies';

const validationSchema = Yup.object({
  identifier: Yup.string().required(),
  password: Yup.string().min(8).required(),
});


export default function Login() {
  
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors = {}, isValid } } = useForm({
    resolver: useYupResolver(validationSchema),
    mode: 'onBlur',
  });

  const { login } = useStore();

  const submit = async (data) => {
    await login(data);
    addAlert('Successfull login');
    navigate('/');
  };

  return <div className="grid grid-cols-5">
    <div className="col-start-3 py-20">
      <div className="container py-20"> 
        <p className="font-sans text-xl">Welcome to Comment SPA app</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <div className="container">
          <div>
            <Label htmlFor="identifier" value="Email or login" />
          </div>
          <TextInput id="identifier" type="text" {...register("identifier")} required/>
          <p className='text-red-600 text-xs'>{errors?.identifier?.message ?? ''}</p>
        </div>
        <div className="container">
          <div>
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput id="password" type="password" {...register("password")} required/>
          <p className='text-red-600 text-xs'>{errors?.password?.message ?? ''}</p>
        </div>
        <Button disabled={!isValid} color='purple' type='submit'> Log in </Button>
      </form>
      <div className="container font-sans py-4">
        Do not have an account?<a className="px-2 text-purple-600" onClick={() => navigate('/register')}>Register</a>
      </div>
    </div>
  </div>
}