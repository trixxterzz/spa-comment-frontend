import { Button, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useYupResolver } from '../../utils/useYupResolver';
import addAlert from '../../utils/addAlert';
import useStore from '../../store';

const validationSchema = Yup.object({
  login: Yup.string().required(),
  email: Yup.string().required().test('valid-email', 'enter valid email', (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)),
  password: Yup.string().min(8).required(),
  passwordConfirm: Yup.string().oneOf([ Yup.ref('password'), null ], 'passwords should match').required('confirm your passsword'),
  homepage: Yup.string().optional(),
});


export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors = {}, isValid } } = useForm({
        resolver: useYupResolver(validationSchema),
        mode: 'onBlur',
    });

    const { register: registerUser } = useStore();

    const submit = async (data) => {
        console.log(data);
        await registerUser(data);
        addAlert('User has been successfully registered');
        navigate('/login');
    };

    return <div className="grid grid-cols-6">
    <div className="col-start-3 col-span-2 py-20">
      <div className="container py-20"> 
        <p className="font-sans text-xl text-center">Register page</p>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(submit)}>
        <div className='grid grid-cols-2 gap-6'>
            <div className='container'>
                <div className="container py-2">
                    <div>
                        <Label htmlFor="login" value="Login" />
                    </div>
                    <TextInput id="login" type="text" {...register("login")} required/>
                    <p className='text-red-600 text-xs'>{errors?.login?.message ?? <>&nbsp;</>}</p>
                </div>
                <div className="container py-2">
                    <div>
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" type="password" {...register("password")} required/>
                    <p className='text-red-600 text-xs'>{errors?.password?.message ?? <>&nbsp;</>}</p>
                </div>
                <div className="container py-2">
                    <div>
                        <Label htmlFor="homepage" value="Home page URL" />
                    </div>
                    <TextInput id="homepage" type="text" {...register("homepage")}/>
                    <p className='text-red-600 text-xs'>{errors?.homepage?.message ?? <>&nbsp;</>}</p>
                </div>
            </div>
            <div className='container'>
                <div className="container py-2">
                    <div>
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" type="email" {...register("email")} required/>
                    <p className='text-red-600 text-xs'>{errors?.email?.message ?? <>&nbsp;</>}</p>
                </div>
                <div className="container py-2">
                    <div>
                        <Label htmlFor="passConf" value="Password confirmation" />
                    </div>
                    <TextInput id="passConf" type="password" {...register("passwordConfirm")} required/>
                    <p className='text-red-600 text-xs'>{errors?.passConf?.message ?? <>&nbsp;</>}</p>
                </div>
            </div>
        </div>
        <Button disabled={!isValid} color='purple' type='submit'> Register </Button>
      </form>
      <div className="container font-sans py-4">
        Already have an account?<a className="px-2 text-purple-600" onClick={() => navigate('/login')}>Log in</a>
      </div>
    </div>
  </div>
}